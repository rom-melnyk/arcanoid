(function (GAME) {
	var BRICKS_PER_ROW = 10;
	var BRICK_ROWS = 3;

	var playground = GAME.playground;
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
			new GAME.GameObject('brick', x, y, width, height)
		);
	}

	var bricks = [];
	for (var x = 1; x <= BRICKS_PER_ROW; x++) {
		for (var y = 1; y <= BRICK_ROWS; y++) {
			createBrick(x, y);
		}
	}

	GAME.bricks = bricks;
})(GAME);
