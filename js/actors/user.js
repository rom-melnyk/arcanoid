(function (actors) {
	var isActive = false;

	function kbdHandler (evt) {
		console.log('Keyboard event');
		console.log(evt);
	}

	function mouseHandler (evt) {
		console.log('Mouse event');
		console.log(evt);
	}

	actors.User = {
		events: {
			// event names will be here
		},

		start: function () {
			if (isActive) return false;

			document.addEventListener('keydown', kbdHandler);
			document.addEventListener('mouseover', mouseHandler);
			isActive = true;
			return true;
		},

		pause: function () {
			if (!isActive) return false;

			document.removeEventListener('keydown', kbdHandler);
			document.removeEventListener('mouseover', mouseHandler);
			isActive = false;
			return true;
		},

		isActive: function () {
			return isActive;
		},

		/**
		 * @return {Boolean}
		 */
		winsWhen: function () {
			return GAME.Model.Bricks.length === 0;
		}
	};
})(GAME.Actors);
