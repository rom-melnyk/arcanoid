(function (levels) {
	/**
	 * Describe levels design here.
	 * - No more than 5 lines; no more than 10 bricks per line.
	 * - "-" stands for regular brick,
	 * - "+" stands for a bit harder brick,
	 * - "*" stands for a tough cookie,
	 * - "X" stands for unbreakable piece of an armor.
	 */
	var _lvls = [
		{
			name: 'Basic',
			lines: [
				'--X----X--',
				'----**----',
				'---++++---'
			]
		},
		{
			name: 'Plus',
			lines: [
				'          ',
				' -------- ',
				' -------- ',
				'-XXXXXXXX-'
			]
		}
	];

	GAME.initLevels = function () {
		/**
		 * @return {Object}			the level object
		 */
		levels.get = function (no) {
			return _lvls[no];
		};

		/**
		 * @return {Number}
		 */
		levels.getCount = function () {
			return _lvls.length;
		};
	}

})(GAME.Levels);