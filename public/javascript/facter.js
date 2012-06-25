$(function() {
	
	var search = new Search
	var search_view = new SearchView({model: search})
	var facts_view = new FactsView({model: search})
	var alt_view = new AlternateView({model: search})
})