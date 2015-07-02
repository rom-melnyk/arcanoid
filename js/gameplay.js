(function (GAME) {
	function play () {
		GAME.Actors.Timer.start();
		GAME.Actors.User.start();
	}

	function pause () {
		GAME.Actors.Timer.pause();
		GAME.Actors.User.pause();
	}

	GAME.doScenario = function () {
		GAME.Actors.initUser();
		GAME.Actors.initTimer();

		GAME.Model.init();
		// here will be the gameplay design

		GAME.Dispatcher.on(GAME.Actors.User.events.playPause, function () {
			if (GAME.Actors.User.isActive()) {
				pause();
			} else {
				play();
			}
		});
	};
})(GAME);