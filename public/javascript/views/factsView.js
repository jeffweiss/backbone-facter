$(function () {
	
	window.FactsView = Backbone.View.extend({
		el: $("#facts"),
		initialize: function() {
			this.model.bind("searchResultsEvent", this.render, this);
		},
		render: function(response) {
			$("#facts").empty();
			for (var key in response) {
				$("#facts").append("<div>" + key + ": " + response[key] + "</div>");
			}
		}
	})
})