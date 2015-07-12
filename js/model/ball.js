(function (model) {
	var ball;
	var racket;
	var playground;
	var bricks;
	var timer;
	model.Ball = null; // will be initialized later

	/**
	 * @private
	 * Reflect the ball from the  brick
	 */
	function _reflectFromBrick (brick) {
		var centerX = ball.x + ball.width / 2;
		var centerY = ball.y + ball.height / 2;

		if (centerX > brick.x && centerX < brick.x + brick.width) { // top, bottom
			ball.dy = -ball.dy;
		} else if (centerY > brick.y && centerY < brick.y + brick.height) { // left, right
			ball.dx = -ball.dx;
		} else { // angles
			ball.dx = -ball.dx;
			ball.dy = -ball.dy;
		}
	}

	/**
	 * @private
	 * This magic changes the reflection angle
	 * depending on the which part of the racket touched the ball.
	 *
	 * The more peripheral part of the racket the ball hits, the more the angle changes
	 */
	function _changeDxReflectingFromRacket () {
		// means how far from ball's center of from racket's center. -1 (left) ... 0 (center) ... +1 (right)
		var dCenter;

		ball.x -= ball.dx; // return back x-position...
		dCenter = ((ball.x + ball.width / 2) - (racket.x + racket.width / 2)) / (racket.width / 2);

		ball.dx = dCenter * playground.width * .005 + (1 - Math.abs(dCenter)) * ball.dx;
		ball.x += ball.dx; // ...and shift it in new way
	}

	model.initBall = function () {
		racket = model.Racket;
		playground = model.Playground;
		timer = GAME.Actors.Timer;

		// place the ball on the middle of the racket
		var width = racket.height * 1.5;
		var height = racket.height * 1.5;
		var x = racket.x + racket.width / 2 - width / 2;
		var y = racket.y - height;

		var dx = 0;
		var dy = playground.height / GAME.CFG.fps / 2;

		ball = model.Ball = new model.GameObject('ball', x, y, width, height, dx, dy);

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
				for (var i = 0; i < bricks.length; i++) {
					if (ball.intersects(bricks[i])) {
						_reflectFromBrick(bricks[i]);
						bricks[i].delete();
						bricks.splice(i, 1);
						break;
					}
				}

				if (bricks.length === 0) {
					GAME.Dispatcher.emit('you-won');
				}
			}

			// reflect from the ceiling
			if (this.y < 0) {
				this.y = -this.y;
				this.dy = -this.dy;
			}

			// reflect from the racket or fall on the floor
			if (this.y + this.height > racket.y) {
				if (this.intersects(racket)) { // reflect from the racket only
					_changeDxReflectingFromRacket();
					this.dy = -this.dy;
					this.y = racket.y - this.height - (this.y + this.height - racket.y);
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
