(function (GAME) {
	var state;

	GAME.initState = function () {
		state = {
			score: 0,
			level: 1
		};

		state.reset = function () {
			this.score = 0;
			this.level = 0;
		};

		GAME.State = state;
	}
})(GAME);
