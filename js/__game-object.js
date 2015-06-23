
/**
 * Check if this object intersect another one
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
 * Reset the element with the initial values
 */
this.reset = function () {

};


racket.reset = function () {
	this.x = playground.width / 2 - this.width / 2;
	this.y = playground.height - playground.interval - this.height;
	this.width = playground.width * 0.1;
	this.height = playground.height * 0.02;
};


ball.reset = function () {
	this.width = this.height = racket.height * 2;
	this.x = racket.x + racket.width / 2 - this.width / 2;
	this.y = racket.y - this.height;
};
