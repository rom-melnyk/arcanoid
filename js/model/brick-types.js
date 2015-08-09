(function (model) {
	model.BrickTypes = {
		REGULAR: {
			value: 1,
			hits: 1,
			chars: /-/,
			className: 'regular'
		},
		REGULAR_PLUS: {
			value: 1.5,
			hits: 2,
			chars: /\+/,
			className: 'regular-plus'
		},
		EXTRA: {
			value: 3,
			hits: 4,
			chars: /\*/,
			className: 'extra'
		},
		ARMOR: {
			value: 0,
			hits: Number.POSITIVE_INFINITY,
			chars: /[xX]/,
			className: 'armor'
		}
	};

	model.BrickTypes.detect = function (char) {
		var brType = false;

		for (var key in model.BrickTypes) {
			if (model.BrickTypes[key].chars) {
				if (model.BrickTypes[key].chars.exec(char)) {
					brType = model.BrickTypes[key];
					break;
				}
			}
		}

		return brType;
	};
})(GAME.Model);
