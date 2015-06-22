(function (GAME) {
	var racket = GAME.racket;

	// place the ball on the middle of the racket
	var width = racket.height * 2;
	var height = racket.height * 2;
	var x = racket.x + racket.width / 2 - width / 2;
	var y = racket.y - height;

	var ball = new GAME.GameObject('ball', x, y, width, height);

	GAME.ball = ball;
})(GAME);
