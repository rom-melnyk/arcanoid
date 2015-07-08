(function (model) {
	model.Bricks = null; // will be initialized later

	var playground;
	var bricks;
	var width;
	var height;

	var BRICKS_PER_ROW = GAME.CFG.Bricks.bricksPerRow;
	var BRICK_ROWS = GAME.CFG.Bricks.brickRows;

	/**
	 * @param {Number} x		position number of the brick in the row (1...BRICKS_PER_ROW)
	 * @param {Number} y		position number of the row (1...BRICK_ROWS)
	 */
	function createBrick (x, y) {
		x = x * playground.interval + (x - 1) * width;
		y = y * playground.interval + (y - 1) * height;

		bricks.push(
			new model.GameObject('brick', x, y, width, height)
		);

		if (y + height > bricks.bottomLine) bricks.bottomLine = y + height;
	}

	model.initBricks = function () {
		playground = model.Playground;
		bricks = [];
		/**
		 * @cfg {Number} bottomLine
		 * Means the bottom coordinate of the lowest brick; when the ball is below, there is no necessity
		 * to check if it hots any brick.
		 */
		bricks.bottomLine = 0;

		width = (playground.width - playground.interval - BRICKS_PER_ROW * playground.interval) / BRICKS_PER_ROW;
		height = playground.height * 0.05;

		for (var x = 1; x <= BRICKS_PER_ROW; x++) {
			for (var y = 1; y <= BRICK_ROWS; y++) {
				createBrick(x, y);
			}
		}

		model.Bricks = bricks;
	}

})(GAME.Model);
