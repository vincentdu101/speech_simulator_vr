// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This application demonstrates how to perform basic recognize operations with
 * with the Google Cloud Speech API.
 *
 * For more information, see the README.md under /speech and the documentation
 * at https://cloud.google.com/speech/docs.
 */

'use strict';

const fs = require('fs');
const record = require('node-record-lpcm16');

// [START speech_quickstart]
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'western-passkey-91920';

// Instantiates a client
const speechClient = speech({
  projectId: projectId
});

// The name of the audio file to transcribe
const filename = './yes.flac';

// The audio file's encoding and sample rate
const options = {
  encoding: 'FLAC',
  sampleRate: 16000
};


// module.exports = {

	// recognize: function(filename) {
		// Detects speech in the audio file
		speechClient.recognize(filename, options, (err, result) => {
		  if (err) {
		    console.error(err);
		    return;
		  }

		  console.log(`Transcription: ${result}`);
		});
	// }

// };

