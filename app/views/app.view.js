var app = app || {};

(function($) {
	'use strict';

	// renders the full list of todo items calling TodoView for each one.
	app.AppView = Backbone.View.extend({
		el: '#todoapp',
		
		initialize: function() {
			this.input = this.$('#new-todo');
			app.todoList.on('add', this.addAll, this);
			app.todoList.on('reset', this.addAll, this);
			app.todoList.fetch(); // Loads list from local storage
		},
		
		events: {
			'keypress #new-todo': 'createTodoOnEnter'
		},
		
		createTodoOnEnter: function(e) {
			if (e.which !== 13 || !this.input.val().trim()) { // ENTER_KEY = 13
				return;
			}
			app.todoList.create(this.newAttributes());
			this.input.val(''); // clean input box
		},
		
		addOne: function(todo) {
			var view = new app.TodoView({model: todo});
			$('#todo-list').append(view.render().el);
		},
		
		addAll: function() {
			// clean the todo list
			this.$('#todo-list').html('');
			
			// filter todo item list
			switch (window.filter) {
			case 'pending':
				_.each(app.todoList.remaining(), this.addOne);
				break;
			case 'completed':
				_.each(app.todoList.completed(), this.addOne);
				break;
			default:
				app.todoList.each(this.addOne, this);
				break;
			}
		},
		
		newAttributes: function() {
			return {
				title: this.input.val().trim(),
				completed: false
			}
		}
	});
})(jQuery);
