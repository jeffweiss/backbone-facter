$(function() {
	
	window.SearchView = Backbone.View.extend({
		el: $("#search"),
		initialize: function() {
		},
		events: {
			'click #search_button': 'showFacts',
			'keyup #fact_name_search': 'showFacts',
		},
		showFacts: function() {
			this.model.do_search();
		},
		refreshFacts: function() {
			this.model.new();
		}
	})
})