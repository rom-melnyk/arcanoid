(function (model) {
	model.Bricks = null; // will be initialized later

	var playground;
	var bricks;
	var width;
	var height;

	var BRICKS_PER_ROW = GAME.CFG.Bricks.bricksPerRow;
	var BRICK_ROWS = GAME.CFG.Bricks.brickRows;

	/**
	 * @param {Number} x			position number of the brick in the row (1...BRICKS_PER_ROW)
	 * @param {Number} y			position number of the row (1...BRICK_ROWS)
	 * @param {Object} type
	 */
	function createBrick (x, y, type) {
		var brick;
		x = x * playground.interval + (x - 1) * width;
		y = y * playground.interval + (y - 1) * height;

		brick = new model.GameObject('brick' + ' ' + type.className, x, y, width, height);
		brick.hits = type.hits;
		brick.value = type.value;

		bricks.push(brick);

		if (y + height > bricks.bottomLine) bricks.bottomLine = y + height;
	}

	model.initBricks = function () {
		var level = GAME.Levels.get(GAME.State.level);
		var brickType;

		if (!playground) playground = model.Playground;
		bricks = [];

		/**
		 * @cfg {Number} bottomLine
		 * Means the bottom coordinate of the lowest brick; when the ball is below, there is no necessity
		 * to check if it hots any brick.
		 */
		bricks.bottomLine = 0;

		width = (playground.width - playground.interval - BRICKS_PER_ROW * playground.interval) / BRICKS_PER_ROW;
		height = playground.height * 0.05;

		for (var y = 1, rowsMax = Math.min(BRICK_ROWS, level.lines.length); y <= rowsMax; y++) {
			if (!level.lines[y-1]) break;

			for (var x = 1; x <= BRICKS_PER_ROW; x++) {
				brickType = model.BrickTypes.detect(level.lines[y-1][x-1]);
				if (brickType) createBrick(x, y, brickType);
			}
		}

		model.Bricks = bricks;
	}

})(GAME.Model);
