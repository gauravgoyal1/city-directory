var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(/[A-Za-z\s]+/);
        if (match) {
            this.store.findByCountry(match, function(country) {
                $('body').html(new CountryView(country).render().el);
            });
        }
    },

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
        var self = this;
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
    },

    initialize: function() {
        var self = this;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            self.showAlert('Directory Loaded', 'Sucess');
            self.route();
        });
    }
};

app.initialize();