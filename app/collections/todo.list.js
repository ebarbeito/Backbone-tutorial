var app = app || {};

(function() {
	'use strict';
	
	app.TodoList = Backbone.Collection.extend({
		model: app.Todo,
		localStorage: new Store('backbone-todo'),
		
		completed: function() {
			return this.filter(function(todo) {
				return todo.get('completed');
			});
		},
		
		remaining: function() {
			return this.without.apply(this, this.completed());
		}
	});
	
	// instance of the Collection
	app.todoList = new app.TodoList();
})();
