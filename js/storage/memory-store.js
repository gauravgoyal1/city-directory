var MemoryStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var countries = this.countries.filter(function(element) {
            return element.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, countries);
    }

    this.findByCountry = function(country_find, callback) {
        var countries = self.countries;
        var country = null;
        var l = countries.length;
        for (var i=0; i < l; i++) {
            if (countries[i] == country_find ){
                country = countries[i];
                break;
            }
        }
        callLater(callback, country);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }
    var self = this;
    $.getJSON("https://city-api.herokuapp.com/?countries=true", function(json) {
        self.countries = json.countries;
    });

    callLater(successCallback);

}