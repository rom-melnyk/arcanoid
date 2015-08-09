(function (dispatcher) {
	var events = [
		'TIMER',

		'YOU_WIN',
		'YOU_LOSE',
		'PLAY_PAUSE',

		'MOUSE_MOVE',
		'MOUSE_CLICK',


		'BRICK_HIT'
	];

	events.forEach(function (evtName) {
		dispatcher[evtName] = evtName.toLowerCase().replace(/_/g, '-');
	});

})(GAME.Dispatcher);
