(function (model) {
	var ball;
	var racket;
	var playground;
	var timer;
	model.Ball = null; // will be initialized later

	model.initBall = function () {
		racket = model.Racket;
		playground = model.Playground;
		timer = GAME.Actors.Timer;

		// place the ball on the middle of the racket
		var width = racket.height * 2;
		var height = racket.height * 2;
		var x = racket.x + racket.width / 2 - width / 2;
		var y = racket.y - height;

		ball = model.Ball = new model.GameObject('ball', x, y, width, height);

		// Arbitrary initial values. We use 'em just to show ball movement.
		// Further versions will use more interesting scenarios
		ball.dx = 3;
		ball.dy = -4;

		/**
		 * Describes ball moving principle.
		 * Pay attention, ball is able to reflect from any wall of the playground.
		 * In contrast to the `Racket`, internal `dx` and `dy` are used since both can change (whilst reflecting)
		 */
		ball.move = function () {
			this.x += this.dx;
			this.y += this.dy;

			if (this.x < 0) {
				this.x = -this.x;
				this.dx = -this.dx;
			}
			if (this.x + this.width > playground.width) {
				this.x = playground.width - this.width - (this.x + this.width - playground.width);
				this.dx = -this.dx;
			}

			if (this.y < 0) {
				this.y = -this.y;
				this.dy = -this.dy;
			}
			if (this.y + this.height > playground.height) {
				this.y = playground.height - this.height - (this.y + this.height - playground.height);
				this.dy = -this.dy;
			}
		};

		// ball movement
		GAME.Dispatcher.on(timer.event, function () {
			ball.move();
			ball.draw();
		});

	}
})(GAME.Model);
