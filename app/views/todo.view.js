var app = app || {};

(function($) {
	'use strict';

	// renders individual todo items list (li)
	app.TodoView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#item-template').html()),
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.input = this.$('.edit');
			return this;
		},
		
		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
		},
		
		events: {
			'dblclick label': 'edit',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close',
			'click .toggle': 'toggleCompleted',
			'click .destroy': 'destroy'
		},
		
		edit: function() {
			this.$el.addClass('editing');
			this.input.focus();
		},
		
		close: function() {
			var value = this.input.val().trim();
			if (value && value == this.input.val()) {
				this.model.save({title: value});
			} else {
				this.input.val(this.model.get('title'));
			}
			this.$el.removeClass('editing');
		},
		
		updateOnEnter: function(e) {
			if (e.which == 13) {
				this.close();
			}
		},
		
		toggleCompleted: function(){
			this.model.toggle();
		},
		
		destroy: function(){
			this.model.destroy();
		}
	});
})(jQuery);