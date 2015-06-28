(function (GAME) {
	GAME.CFG = {
		/**
		 * @cfg {Number} fps						frames per second
		 */
		fps: 30,

		/**
		 * @cfg {Number} mouseSensitivity			<1 is slow; 1 is normal; >1 is fast
		 */
		mouseSensitivity: 2,

		/**
		 * @cfg {Object} Bricks 					bricks initial setup
		 */
		Bricks: {
			bricksPerRow: 10,
			brickRows: 3
		}
	};
})(GAME);