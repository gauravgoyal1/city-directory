var CountryView = function(country) {
	
	this.render = function() {
		var self = this;
	    $.getJSON("https://city-api.herokuapp.com/?country=" + country, function(json) {
	        self.el.html(CountryView.template(json));
	    });
	    return this;
	};

    this.initialize = function() {
        this.el = $('<div/>');
    };
    this.initialize();
}

CountryView.template = Handlebars.compile($("#country-tpl").html());