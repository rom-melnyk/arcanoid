(function (model) {
	model.Playground = null; // will be initialized later

	model.initPlayground = function () {
		var playground = {};
		playground.dom = document.querySelector('.playground');
		playground.width = playground.dom.clientWidth;
		playground.height = playground.dom.clientHeight;
		playground.interval = 5;

		model.Playground = playground;
	};
})(GAME.Model);
