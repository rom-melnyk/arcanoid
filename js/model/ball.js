(function (model) {
	model.Ball = null; // will be initialized later

	model.initBall = function () {
		var racket = model.Racket;

		// place the ball on the middle of the racket
		var width = racket.height * 2;
		var height = racket.height * 2;
		var x = racket.x + racket.width / 2 - width / 2;
		var y = racket.y - height;

		model.Ball = new model.GameObject('ball', x, y, width, height);
	}
})(GAME.Model);
