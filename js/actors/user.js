(function (actors) {
	var isActive = false;

	function kbdHandler (evt) {
		if (evt.keyCode === 32) { // space
			GAME.Dispatcher.emit(actors.User.events.playPause);
		}
	}

	function mouseHandler (evt) {
		GAME.Dispatcher.emit(actors.User.events.mouse, evt.clientX);
	}

	actors.User = {
		events: {
			playPause: 'play-pause',
			mouse: 'mouse'
		},

		start: function () {
			if (isActive) return false;

			document.addEventListener('keydown', kbdHandler);
			document.addEventListener('mouseover', mouseHandler);
			isActive = true;
			return true;
		},

		pause: function () {
			if (!isActive) return false;

			document.removeEventListener('keydown', kbdHandler);
			document.removeEventListener('mouseover', mouseHandler);
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
})(GAME.Actors);
