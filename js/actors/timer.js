(function (actors) {
	var timerId = null;

	actors.Timer = {
		/**
		 * The event name
		 */
		event: 'timer',

		start: function () {
			if (timerId) return false;

			timerId = setInterval(function () {
				GAME.Dispatcher.emit(actors.Timer.event);
			}, GAME.CFG.fps);

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
		},

		/**
		 * @return {Boolean}
		 */
		winsWhen: function () {
			return GAME.Model.Ball.y + GAME.Model.Ball.height >= GAME.Model.Playground.height;
		}
	};
})(GAME.Actors);
