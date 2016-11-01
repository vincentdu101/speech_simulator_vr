var GamepadController = (function(){

	var gamepad;

	function init() {
		if (!!navigator.getGamepads) {
			window.addEventListener("gamepadconnected", function(e) {
	      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
	      e.gamepad.index, e.gamepad.id,
	      e.gamepad.buttons.length, e.gamepad.axes.length);
	      
	    });

	    window.addEventListener("gamepaddisconnected", function(e) {
	      console.log("Gamepad disconnected from index %d: %s",
	      e.gamepad.index, e.gamepad.id);
	    });

	    setInterval(function() {gameLoop()}, 100);
		}
	}

	function buttonPressed(button) {
		if (typeof button == "object") {
			return button.pressed;
		}
		return button == 1.0;
	}

	function gameLoop() {
		gamepad = navigator.getGamepads()[0];
		for(var i = 0; i < gamepad.buttons.length; i++) {
			if (buttonPressed(gamepad.buttons[i])) {
				console.log(i);
				console.log(gamepad.buttons[i]);
			}
		}
	}

	return {
		init: init
	}

}());

