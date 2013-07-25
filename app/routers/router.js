var app = app || {};

(function() {
	'use strict';

	app.Router = Backbone.Router.extend({
		routes: {
			'*filter' : 'setFilter'
		},
		
		setFilter: function(params) {
			window.filter = params.trim() || '';
			app.todoList.trigger('reset');
		}
	});

	app.router = new app.Router();
	Backbone.history.start();
})();