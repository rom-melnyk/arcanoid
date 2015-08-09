(function (GAME) {
	/**
	 * @private
	 * @cfg {Object<key,Function[]>} handlers
	 */
	var handlers = {};

	GAME.Dispatcher = {
		/**
		 * Attach the listener (handler) to the event
		 * @param {String} event
		 * @param {Function} handler
		 */
		on: function (event, handler) {
			if (!handlers[event]) handlers[event] = [];
			if (handlers[event].indexOf(handler) === -1) handlers[event].push(handler);
		},

		/**
		 * Removes the listener (handler) from the event
		 * @param {String} event
		 * @param {Function} handler
		 */
		off: function (event, handler) {
			var index;

			if (!handlers[event]) return false;
			index = handlers[event].indexOf(handler);
			if (index === -1) return false;
			handlers[event].splice(index, 1);
			return handler;
		},

		/**
		 * Trigger the event
		 * @param {String} event
		 * @param {...*} [eventArgs]
		 */
		emit: function (event, eventArgs) {
			var args;
			if (!handlers[event]) return false;

			args = Array.prototype.slice.call(arguments, 1);
			handlers[event].forEach(function (handler) {
				if (typeof handler === 'function') handler.apply(GAME, args);
			});
		}
	};
})(GAME);
