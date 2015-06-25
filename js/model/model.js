(function (GAME) {
	var model = {};
	var playground;
	var racket;
	var ball;
	var bricks;

	function initPlayground () {
		playground = {};
		playground.dom = document.querySelector('.playground');
		playground.width = playground.dom.clientWidth;
		playground.height = playground.dom.clientHeight;
		playground.interval = 5;

		GAME.Model.playground = playground;
	}

	function initRacket () {
		// place the racket in the middle of the playground
		var width = playground.width * 0.1;
		var height = playground.height * 0.02;
		var y = playground.height - playground.interval - height;
		var x = playground.width / 2 - width / 2;

		racket = new GAME.Model.GameObject('racket', x, y, width, height);
		GAME.Model.racket = racket;
	}

	function initBall () {
		// place the ball on the middle of the racket
		var width = racket.height * 2;
		var height = racket.height * 2;
		var x = racket.x + racket.width / 2 - width / 2;
		var y = racket.y - height;

		ball = new GAME.Model.GameObject('ball', x, y, width, height);
		GAME.Model.ball = ball;
	}

	function initBricks () {
		var BRICKS_PER_ROW = GAME.CFG.Bricks.bricksPerRow;
		var BRICK_ROWS = GAME.CFG.Bricks.brickRows;

		var width = (playground.width - playground.interval - BRICKS_PER_ROW * playground.interval) / BRICKS_PER_ROW;
		var height = playground.height * 0.05;

		/**
		 * @param {Number} x		position number of the brick in the row (1...BRICKS_PER_ROW)
		 * @param {Number} y		position number of the row (1...BRICK_ROWS)
		 */
		function createBrick (x, y) {
			x = x * playground.interval + (x - 1) * width;
			y = y * playground.interval + (y - 1) * height;

			bricks.push(
				new GAME.Model.GameObject('brick', x, y, width, height)
			);
		}

		bricks = [];
		for (var x = 1; x <= BRICKS_PER_ROW; x++) {
			for (var y = 1; y <= BRICK_ROWS; y++) {
				createBrick(x, y);
			}
		}

		GAME.Model.bricks = bricks;
	}

	model.init = function () {
		initPlayground();
		initRacket();
		initBall();
		initBricks();
	};

	GAME.Model = model;
})(GAME);
