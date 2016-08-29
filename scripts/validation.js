(function(window) {
    'use strict';
    var App = window.App || {};

    // Will only be used for organizing functions, does not need constructor
    var Validation = {
	isCompanyEmail: function(email) {
	    // .+ == one or more characters
	    // @bignerdranch\.com$ == $ indicates @...com must appear at the end
	    return /.+@bignerdranch\.com$/.test(email);
	}
    };

    App.Validation = Validation;
    window.App = App;
})(window);
