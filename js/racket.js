(function (GAME) {
	var playground = GAME.playground;

	// place the racket in the middle of the playground
	var width = playground.width * 0.1;
	var height = playground.height * 0.02;
	var y = playground.height - playground.interval - height;
	var x = playground.width / 2 - width / 2;

	var racket = new GAME.GameObject('racket', x, y, width, height);

	GAME.racket = racket;
})(GAME);
