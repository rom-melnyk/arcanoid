var BRICKS_PER_ROW = 10;
var BRICK_ROWS = 3;

var playground;
var playgroundWidth;
var playgroundHeight;

var brickWidth;
var brickHeight;
var interval = 5;

var ball;
var racket;

/**
 * Initialize the game environment (logical and visual)
 */
function init () {
	// the `div.playground` already exists; let's bind it to the variable
	playground = document.querySelector('.playground');
	playgroundWidth = playground.clientWidth;
	playgroundHeight = playground.clientHeight;

	brickWidth = (playgroundWidth - interval - BRICKS_PER_ROW * interval) / BRICKS_PER_ROW;
	brickHeight = playgroundHeight * 0.05;
}

/**
 * @param {Number} x		position number of the brick in the row (1...BRICKS_PER_ROW)
 * @param {Number} y		position number of the row (1...BRICK_ROWS)
 */
function createBrick (x, y) {
	var elm = document.createElement('div');
	elm.className = 'brick';

	elm.style.width = brickWidth + 'px'; // must be followed by "px" like in CSS!
	elm.style.height = brickHeight + 'px';
	elm.style.top = y * interval + (y - 1) * brickHeight + 'px';
	elm.style.left = x * interval + (x - 1) * brickWidth + 'px';

	playground.appendChild(elm);
}

/**
 * Put all the elements to the playground
 */
function createScene () {
	for (var x = 1; x <= BRICKS_PER_ROW; x++) {
		for (var y = 1; y <= BRICK_ROWS; y++) {
			createBrick(x, y);
		}
	}

	racket = document.createElement('div');
	racket.className = 'racket';
	racket.style.width = brickWidth + 'px';
	racket.style.height = brickHeight / 2 + 'px';

	// the racket is parked at the bottom; following is easier than calculating `top` position
	racket.style.bottom = interval + 'px';
	racket.style.left = (playgroundWidth - brickWidth) / 2 + 'px'; // center

	playground.appendChild(racket);

	ball = document.createElement('div');
	ball.className = 'ball';
	ball.style.width = brickHeight + 'px';
	ball.style.height = brickHeight + 'px';

	// park ball on the racket
	ball.style.top = (playgroundHeight - interval - brickHeight / 2 - brickHeight) + 'px';
	ball.style.left = (playgroundWidth - brickHeight) / 2 + 'px';

	playground.appendChild(ball);
}