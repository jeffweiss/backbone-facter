$(function() {
	
	window.Search = Backbone.Model.extend({
		initialize: function() {
		},
		new: function() {
			var _this = this;
			
			$.ajax({
				url: "/refresh",
				type: "POST",
				success: function(response) {
					var json = $.parseJSON(response);
					
					_this.trigger("refreshFactsEvent", json);
				}
			})
		},
		do_search: function() {
			var _this = this;
			var _el = $("#fact_name_search");
			var _fns = _el[0].value;
			if (_fns.length < 3) return;
			
			$.ajax({
				url: "/search",
				type: "POST",
				data: {fact_name_search: _fns},
				success: function(response) {
					var json = $.parseJSON(response);
					
					_this.trigger("searchResultsEvent", json);
				}
			})
		}
	})
})