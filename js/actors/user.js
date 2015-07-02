(function (actors) {
	var isActive = false;
	var previousX = null;
	actors.User = null; // will be initialized later

	function kbdHandler (evt) {
		if (evt.keyCode === 32) { // space
			GAME.Dispatcher.emit(actors.User.events.playPause);
		}
	}

	function mouseMoveHandler (evt) {
		previousX = previousX || evt.clientX;
		GAME.Dispatcher.emit(actors.User.events.mouseMove, (evt.clientX - previousX) * GAME.CFG.mouseSensitivity);
		previousX = evt.clientX;
	}

	function mouseClickHandler (evt) {
		GAME.Dispatcher.emit(actors.User.events.mouseClick, evt);
		previousX = evt.clientX;
	}

	var user = {
		events: {
			playPause: 'play-pause',
			mouseMove: 'mouse-move',
			mouseClick: 'mouse-click'
		},

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
		},

		/**
		 * @return {Boolean}
		 */
		winsWhen: function () {
			return GAME.Model.Bricks.length === 0;
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
