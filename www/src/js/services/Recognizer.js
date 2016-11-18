https://github.com/sdkcarlos/artyom.js

var Recognizer = (function(){

	var models = {};

	function loadData() {
		$.ajax({
			url: "js/data/recognition.json",
			dataType: "json",
			success: function(data) {
				models = data;
			}, 
			error: function(data, xhr, erro) {
				console.log(xhr);
			}
		});
	}

	function addCommands(model) {
		var commands = Object.keys(models[model]);
		console.log(commands);
		artyom.addCommands([
		    {
		        indexes: commands,
		        action: function(i){
		        	var command = commands[i];
		            artyom.say(models[model][command]);
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
	}

	function startRecognition(model) {
		addCommands(model);

		setTimeout(function(){
			artyom.initialize({
			    lang:"en-GB", // GreatBritain english
			    continuous:true, // Listen forever
			    soundex:true,// Use the soundex algorithm to increase accuracy
			    debug:true, // Show messages in the console
			    executionKeyword: "and do it now",
			    listen:true // Start to listen commands !
			});
		}, 250);

		setTimeout(function(){
		    artyom.fatality();
		}, 5000);
		artyom.when("ERROR",function(data){
		    console.error(data);
		});
	}

	loadData();

	return {
		startRecognition: startRecognition
	};

}());