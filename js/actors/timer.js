(function (actors) {
	var timerId = null;
	actors.Timer = null; // will be initialized later

	var timer = {
		/**
		 * The event name
		 */
		event: 'timer',

		start: function () {
			if (timerId) return false;

			timerId = setInterval(function () {
				GAME.Dispatcher.emit(actors.Timer.event);
			}, 1000 / GAME.CFG.fps);

			return true;
		},

		pause: function () {
			if (!timerId) return false;

			clearInterval(timerId);
			timerId = null;

			return true;
		},

		/**
		 * @return {Boolean}
		 */
		isActive: function () {
			return !!timerId;
		}
	};

	actors.initTimer = function () {
		actors.Timer = timer;
	}
})(GAME.Actors);
