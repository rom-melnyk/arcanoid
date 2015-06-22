(function (GAME) {
	var playground = {};

	playground.dom = document.querySelector('.playground');
	playground.width = playground.dom.clientWidth;
	playground.height = playground.dom.clientHeight;

	playground.interval = 5;

	GAME.playground = playground;
})(GAME);
