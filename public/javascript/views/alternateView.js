$(function() {
	window.AlternateView = Backbone.View.extend({
		initialize: function() {
			this.model.bind("searchResultsEvent", this.myAwesomeEventHandler, this);
		},
		myAwesomeEventHandler: function(response) {
			$("#reverse").empty();
			for(var key in response) {
				$("#reverse").append('<div>' + key.split('').reverse().join('') + ': ' + response[key].toString().split('').reverse().join('') + '</div>');
			}
		}
	})
})