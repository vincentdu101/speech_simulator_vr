var Microphone = (function(){

  var leftChannel = [], 
    rightChannel = [], 
    getUserMedia,
    recordingLength = 0;

  // creates the audio context
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var context;
  // retrieve the current sample rate to be used for wav packaging
  var sampleRate;

  // creates a gain node
  var volume;

  /* From the spec: This value controls how frequently the audioprocess event is 
  dispatched and how many sample-frames need to be processed each call. 
  Lower values for buffer size will result in a lower (better) latency. 
  Higher values will be necessary to avoid audio breakup and glitches */
  var bufferSize = 2048;
  var recorder;

  function startRecording() {
    if (!getUserMedia) {
      getUserMedia = navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    }

    if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia({audio: true}, micSuccess, function(e){
        alert("error capturing audio");
      });
    } else {
      alert("getUserMedia not supported in this browser");
    }
  }

  function micSuccess(e) {
    context = new AudioContext();
    // creates a gain node
    volume = context.createGain();
    sampleRate = context.sampleRate;

    // creates an audio node from the microphone incoming stream
    var audioInput = context.createMediaStreamSource(e);

    recorder = context.createScriptProcessor(bufferSize, 2, 2);

    // connect the stream to the gain node
    audioInput.connect(volume);

      recorder.onaudioprocess = function(e) {
        var left = e.inputBuffer.getChannelData(0);
        var right = e.inputBuffer.getChannelData(1);

        // we clone the samples
        leftChannel.push(new Float32Array(left));
        rightChannel.push(new Float32Array(right));
        recordingLength += bufferSize;
      };

      // we connect the recorder
      volume.connect(recorder);
      recorder.connect(context.destination);
      startExporting();
  }

  function mergeBuffers(channelBuffer, recordingLength) {
    var result = new Float32Array(recordingLength);
    var offset = 0;
    var lng = channelBuffer.length;
    for (var i = 0; i < lng; i++) {
      var buffer = channelBuffer[i];
      result.set(buffer, offset);
      offset += buffer.length;
    } 
    return result;
  }

  function interleave(leftChannel, rightChannel) {
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);
    var inputIndex = 0;

    for (var index = 0; index < length;) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  }

  function writeUTFBytes(view, offset, string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  function postRecording(url) {
    $.ajax({
        url: "http://localhost:3700/audio",
        method: "POST", 
        data: JSON.stringify({audio: url.replace("blob:", "")}),
        headers: {'Content-Type':'application/json'},
        dataType: "json",
        success: function(data) {
            debugger;
        },
        error: function(xhr) {
            debugger;
        }
    });
  }

  function startExporting() {
    setTimeout(function(){
      if (leftChannel.length > 0 && rightChannel.length > 0) {
        // we flat the left and right channels down
        var leftBuffer = mergeBuffers(leftChannel, recordingLength);
        var rightBuffer = mergeBuffers(rightChannel, recordingLength);

        // we interleave both channels together
        var interleaved = interleave(leftBuffer, rightBuffer);

        // create the buffer and view to create the .wav file
        var buffer = new ArrayBuffer(44 + interleaved.length * 2);
        var view = new DataView(buffer);

        // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
        // RIFF chunk descriptor
        writeUTFBytes(view, 0, "RIFF");
        view.setUint32(4, 44 + interleaved.length * 2, true);
        writeUTFBytes(view, 8, "WAVE");

        // FMT sub-chunk
        writeUTFBytes(view, 12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);

        // stereo (2 channels)
        view.setUint16(22, 2, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 4, true);
        view.setUint16(32, 4, true);
        view.setUint16(34, 16, true);

        // data sub-chunk
        writeUTFBytes(view, 36, "data");
        view.setUint32(40, interleaved.length * 2, true);

        // write the pcm samples
        var lng = interleaved.length; 
        var index = 44; 
        var volume = 1;
        for (var i = 0; i < lng; i++) {
          view.setUint16(index, interleaved[i] * (0x7FFF * volume), true);
          index += 2;
        }

        // our final binary blob that we can hand off
        var blob = new Blob([view], {type: "audio/wav"});
        var url = URL.createObjectURL(blob);
        window.open(url);
        postRecording(url);
        leftChannel = [];
        rightChannel = [];
      }
    }, 5000);
  }

  return {
    startRecording: startRecording
  };

}());