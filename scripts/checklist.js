(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
	if (!selector) {
	    throw new Error('No selector provided');
	}

	this.$element = $(selector);
	if (this.$element.length === 0) {
	    throw new Error('Could not find element with selector: ' + selector);
	}
    }

    // Row(cO) is a private function; not exported to the App namespace
    function Row(coffeOrder) {

    }
    
    App.CheckList = CheckList;
    window.App = App;
})(window);
