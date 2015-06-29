(function (GAME) {
	var model = {};

	model.init = function () {
		model.initPlayground();
		model.initRacket();
		model.initBall();
		model.initBricks();
	};

	GAME.Model = model;
})(GAME);
