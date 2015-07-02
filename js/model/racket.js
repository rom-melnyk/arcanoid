(function (model) {
	var racket;
	var playground;
	var user;
	model.Racket = null; // will be initialized later

	model.initRacket = function () {
		playground = model.Playground;
		user = GAME.Actors.User;

		// place the racket in the middle of the playground
		var width = playground.width * 0.1;
		var height = playground.height * 0.02;
		var y = playground.height - playground.interval - height;
		var x = playground.width / 2 - width / 2;

		racket = model.Racket = new model.GameObject('racket', x, y, width, height);

		/**
		 * Describes the racket movement principle.
		 * The racket moves only horizontally and cannot leave the playground.
		 * In contrast to the `Ball`, we use the `dx` parameter
		 * because the movement depends on external factors (mouse behavior)
		 */
		racket.move = function (dx) {
			this.x += dx;
			if (this.x < 0) {
				this.x = 0;
			}
			if (this.x + this.width > playground.width) {
				this.x = playground.width - this.width;
			}
		};

		// mouse-depended behavior
		GAME.Dispatcher.on(user.events.mouseMove, function (dx) {
			racket.move(dx);
			racket.draw();
		});
	};

})(GAME.Model);
