(function (model) {
	var ball;
	var racket;
	var playground;
	var bricks;
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

		var dx = 0;
		var dy = playground.height / GAME.CFG.fps / 2;

		ball = model.Ball = new model.GameObject('ball', x, y, width, height, dx, dy);

		// Although these vars are used in the `ball.move`, they are declared here.
		// This fixes a memory leak if declaring 'em each time the `ball.move` is invoked (30+ times per second)
		var dCenter, centerX, centerY, i;

		/**
		 * Describes ball moving principle.
		 * Pay attention, ball is able to reflect from any wall of the playground.
		 * In contrast to the `Racket`, internal `dx` and `dy` are used since both can change (whilst reflecting)
		 */
		ball.move = function () {
			if (!bricks) bricks = model.Bricks;

			this.x += this.dx;
			this.y += this.dy;

			// reflect from the left side
			if (this.x < 0) {
				this.x = -this.x;
				this.dx = -this.dx;
			}
			// reflect from the right side
			if (this.x + this.width > playground.width) {
				this.x = playground.width - this.width - (this.x + this.width - playground.width);
				this.dx = -this.dx;
			}

			// top
			if (this.y < bricks.bottomLine) { // bricks area
				for (i = 0; i < bricks.length; i++) {
					if (ball.intersects(bricks[i])) {
						// This code ensures the ball reflecting fine from bricks
						centerX = this.x + this.width / 2;
						centerY = this.y + this.height / 2;
						if (centerX > bricks[i].x && centerX < bricks[i].x + bricks[i].width) { // top, bottom
							this.dy = -this.dy;
						} else if (centerY > bricks[i].y && centerY < bricks[i].y + bricks[i].height) { // left, right
							this.dx = -this.dx;
						} else { // angles
							this.dx = -this.dx;
							this.dy = -this.dy;
						}

						bricks[i].delete();
						bricks.splice(i, 1);
						break;
					}
				}

				if (bricks.length === 0) {
					GAME.Dispatcher.emit('you-won');
				}
			}
			if (this.y < 0) { // reflect from the ceiling
				this.y = -this.y;
				this.dy = -this.dy;
			}

			// reflect from the racket or fall on the floor
			if (this.y + this.height > racket.y) {
				if (this.intersects(racket)) { // reflect from the racket only
					this.y = racket.y - this.height - (this.y + this.height - racket.y);
					this.dy = -this.dy;

					// This magic changes the reflection angle
					// depending on the which part of the racket touched the ball.
					// The more peripheral part of the racket the ball hits, the more the angle changes
					dCenter = ((this.x + this.width / 2) - (racket.x + racket.width / 2)) / (racket.width / 2);
					this.x -= this.dx; // return back x-position...
					this.dx = dCenter * playground.width * .005 + (1 - Math.abs(dCenter)) * this.dx;
					this.x += this.dx; // ...and shift it in new way
				} else { // the ball missed the racket; you lost!
					GAME.Dispatcher.emit('you-lose');
				}
			}
		};

		// ball movement
		GAME.Dispatcher.on(timer.event, function () {
			ball.move();
			ball.draw();
		});

	}
})(GAME.Model);
