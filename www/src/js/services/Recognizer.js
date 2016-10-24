https://github.com/sdkcarlos/artyom.js

var Recognizer = (function(){

	function startRecognition() {
		// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition;
		// var recognition = new SpeechRecognition();
		// recognition.lang = "en-US";
		// recognition.continuous = true;
		// recognition.maxAlternatives = 5;
		// recognition.start();
		// recognition.onresult = function(event) {
		// 	console.log("you said " + event.results[0][0].transcript);
		// }
		artyom.addCommands([
		    {
		        indexes: ['Babe','Hi','is someone there'],
		        action: function(i){
		            artyom.say("I'm sorry boobie I love you");
		        }
		    },
		    {
		        indexes: ['Repeat after me *'],
		        smart:true,
		        action: function(i,wildcard){
		            artyom.say("You've said : "+ wildcard);
		        }
		    }
		]);

		artyom.initialize({
		    lang:"en-GB", // GreatBritain english
		    continuous:true, // Listen forever
		    soundex:true,// Use the soundex algorithm to increase accuracy
		    debug:true, // Show messages in the console
		    executionKeyword: "and do it now",
		    listen:true // Start to listen commands !
		});
	}

	return {
		startRecognition: startRecognition
	};

}());