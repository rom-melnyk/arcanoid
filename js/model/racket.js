(function (model) {
	model.Racket = null; // will be initialized later

	model.initRacket = function () {
		var playground = model.Playground;

		// place the racket in the middle of the playground
		var width = playground.width * 0.1;
		var height = playground.height * 0.02;
		var y = playground.height - playground.interval - height;
		var x = playground.width / 2 - width / 2;

		model.Racket = new model.GameObject('racket', x, y, width, height);
	};

})(GAME.Model);
