(function (actors) {
	var isActive = false;
	var previousX = null;
	actors.User = null; // will be initialized later

	function kbdHandler (evt) {
		if (evt.keyCode === 32) { // space
			GAME.Dispatcher.emit(GAME.Dispatcher.PLAY_PAUSE);
		}
	}

	function mouseMoveHandler (evt) {
		previousX = previousX || evt.clientX;
		GAME.Dispatcher.emit(GAME.Dispatcher.MOUSE_MOVE, (evt.clientX - previousX) * GAME.CFG.mouseSensitivity);
		previousX = evt.clientX;
	}

	function mouseClickHandler (evt) {
		GAME.Dispatcher.emit(GAME.Dispatcher.MOUSE_CLICK, evt);
		previousX = evt.clientX;
	}

	var user = {
		start: function () {
			if (isActive) return false;

			document.addEventListener('mousemove', mouseMoveHandler);
			isActive = true;
			return true;
		},

		pause: function () {
			if (!isActive) return false;

			document.removeEventListener('mousemove', mouseMoveHandler);
			previousX = null;
			isActive = false;
			return true;
		},

		isActive: function () {
			return isActive;
		}
	};

	actors.initUser = function () {
		actors.User = user;

		// In contrast to the Timer, these two must be accessible globally,
		// even if the game is paused
		document.addEventListener('keydown', kbdHandler);
		document.addEventListener('click', mouseClickHandler); // we will use it later
	};
})(GAME.Actors);
