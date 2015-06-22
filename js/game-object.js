(function (GAME) {
	/**
	 * This is the constructor for bricks, ball and rocket
	 * @param {String} className
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 */
	var GameObject = function (className, x, y, width, height) {
		this.dom = document.createElement('div');
		this.dom.className = className;
		GAME.playground.dom.appendChild(this.dom);

		// it's easier to handle dimension as numbers in contrast to their string representation in `element.style`
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;

		/**
		 * If element moves, this pair determines how coordinates change
		 */
		this.dx = 0;
		this.dy = 0;

		this.draw();
	};

	/**
	 * Once we change something within the object, let's reflect it visually
	 */
	GameObject.prototype.draw = function () {
		this.dom.style.width = this.width + 'px';
		this.dom.style.height = this.height + 'px';
		this.dom.style.top = this.y + 'px';
		this.dom.style.left = this.x + 'px';
	};

	GAME.GameObject = GameObject;
})(GAME);
