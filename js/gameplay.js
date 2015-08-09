(function (GAME) {
	function play () {
		GAME.Actors.Timer.start();
		GAME.Actors.User.start();
	}

	function pause () {
		GAME.Actors.Timer.pause();
		GAME.Actors.User.pause();
	}

	function reset () {
		GAME.Model.Ball.reset();
		GAME.Model.Racket.reset();
	}

	GAME.doScenario = function () {
		GAME.initState();
		GAME.initLevels();
		GAME.Actors.initUser();
		GAME.Actors.initTimer();
		GAME.Model.init();

		GAME.Dispatcher.on(GAME.Dispatcher.PLAY_PAUSE, function () {
			if (GAME.Actors.User.isActive()) {
				pause();
			} else {
				play();
			}
		});

		GAME.Dispatcher.on(GAME.Dispatcher.YOU_LOSE, function () {
			console.log('You lose!');
			pause();
			reset();
		});

		GAME.Dispatcher.on(GAME.Dispatcher.YOU_WON, function () {
			console.log('You won! Congratulations!');
			pause();
			reset();
		});
	};
})(GAME);
