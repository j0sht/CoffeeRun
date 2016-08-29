(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    
    function FormHandler(selector) {
	// Code will go here
	if (!selector) {
	    throw new Error('No selector provided');
	}
	this.$formElement = $(selector);
	if (this.$formElement.length === 0) {
	    throw new Error('Could not find element with selector: ' + selector);
	}
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
	console.log('Setting submit handler for form');
	this.$formElement.on('submit', function(event) {
	    event.preventDefault();
	    var data = {};
	    $(this).serializeArray().forEach(function(item) {
		data[item.name] = item.value;
		console.log(item.name + ' is ' + item.value);
	    });
	    console.log(data);
	    fn(data);
	    this.reset();
	    this.elements[0].focus();
	});
    };

    FormHandler.prototype.fillFormWithData = function(data) {
	for (var prop in data) {
	    console.log(prop);
	    if (data.hasOwnProperty(prop)) {
		var $e;
		if (prop === 'size') {
		    $e = this.$formElement.find('[value="' + data[prop] + '"]');
		    if ($e) { $e.prop('checked', true); }
		} else {
		    $e = this.$formElement.find('[name="' + prop + '"]')
		    if ($e) { $e.val(data[prop]); }
		}
	    }
	}
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
