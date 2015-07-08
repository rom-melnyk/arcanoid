(function (model) {
	function round10k (x) {
		return Math.round(x * 10000) / 10000;
	}

	/**
	 * This is the constructor for bricks, ball and rocket
	 * @param {String} className
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} [dx=0]
	 * @param {Number} [dy=0]
	 */
	var GameObject = function (className, x, y, width, height, dx, dy) {
		dx = dx || 0;
		dy = dy || 0;

		this.dom = document.createElement('div');
		this.dom.className = className;
		model.Playground.dom.appendChild(this.dom);

		// it's easier to handle dimension as numbers in contrast to their string representation in `element.style`
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		/**
		 * If element moves, this pair determines how coordinates change
		 */
		this.dx = dx;
		this.dy = dy;

		/**
		 * Reset the element with the initial values
		 */
		this.reset = function () {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.dx = dx;
			this.dy = dy;

			this.draw();
		};

		this.draw();
	};

	/**
	 * Once we change something within the object, let's reflect it visually
	 */
	GameObject.prototype.draw = function () {
		this.dom.style.top = round10k(this.y) + 'px';
		this.dom.style.left = round10k(this.x) + 'px';
		this.dom.style.width = round10k(this.width) + 'px';
		this.dom.style.height = round10k(this.height) + 'px';
	};

	/**
	 * Check if this object intersects another one
	 * @param {GameObject} another
	 * @return {Boolean}
	 */
	GameObject.prototype.intersects = function (another) {
		var thisCenterX = this.x + this.width / 2,
			thisCenterY = this.y + this.height / 2,
			anotherCenterX = another.x + another.width / 2,
			anotherCenterY = another.y + another.height / 2;

		// the distance between centers is less-or-equal than sum of two halves of dimensions
		return Math.abs(thisCenterX - anotherCenterX) <= (this.width / 2 + another.width / 2)
			&& Math.abs(thisCenterY - anotherCenterY) <= (this.height / 2 + another.height / 2);
	};

	/**
	 * Remove appropriate DOM element
	 */
	GameObject.prototype.delete = function () {
		model.Playground.dom.removeChild(this.dom);
		this.dom = null;
	};

	model.GameObject = GameObject;
})(GAME.Model);
