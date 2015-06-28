(function (model) {
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
		model.Playground.dom.appendChild(this.dom);

		// it's easier to handle dimension as numbers in contrast to their string representation in `element.style`
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		/**
		 * If element moves, this pair determines how coordinates change
		 */
		this.dx = 0;
		this.dy = 0;

		/**
		 * Reset the element with the initial values
		 */
		this.reset = function () {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		};

		this.draw();
	};

	/**
	 * Once we change something within the object, let's reflect it visually
	 */
	GameObject.prototype.draw = function () {
		this.dom.style.top = this.y + 'px';
		this.dom.style.left = this.x + 'px';
		this.dom.style.width = this.width + 'px';
		this.dom.style.height = this.height + 'px';
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
