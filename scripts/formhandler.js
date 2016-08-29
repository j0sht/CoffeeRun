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

    FormHandler.prototype.addInputHandler = function(fn) {
	console.log('Setting input handler for form');
	this.$formElement.on('input', '[name="emailAddress"]', function(event) {
	    var email = event.target.value;
	    var message = '';
	    if (fn(email)) {
		event.target.setCustomValidity('');
	    } else {
		message = email + ' is not an authorized email address'
		event.target.setCustomValidity(message);
	    }
	});
    };

    FormHandler.prototype.addDecafHandler = function(fn) {
	var message = 'decaf cannot have a higher caffeine level that 20';
	var coffeeField;
	console.log(coffeeField);
	this.$formElement.on('input', '[name="coffee"]', function(event) {
	    coffeeField = event.target;
	    var data = {}
	    this.$formElement.serializeArray().forEach(function(item) {
		if (item.name === 'coffee' || item.name === 'strength') {
		    data[item.name] = item.value;
		}
	    });
	    if (fn(data.coffee, data.strength)) {
		event.target.setCustomValidity('');
	    } else {
		event.target.setCustomValidity(message);
	    }
	}.bind(this));
	this.$formElement.on('change', '[name="strength"]', function(event) {
	    var data = {}
	    this.$formElement.serializeArray().forEach(function(item) {
		if (item.name === 'coffee' || item.name === 'strength') {
		    data[item.name] = item.value;
		}
	    });
	    if (fn(data.coffee, data.strength)) {
		coffeeField.setCustomValidity('');
	    } else {
		coffeeField.setCustomValidity(message);
	    }
	}.bind(this));
    }
    
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
