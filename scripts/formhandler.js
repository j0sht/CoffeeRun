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

    FormHandler.prototype.addInputHandler = function(fn, db) {
	console.log('Setting input handler for form');
	this.$formElement.on('input', '[name="emailAddress"]', function(event) {
	    var email = event.target.value;
	    var message = '';
	    db.getAll('', function(resp) {
		var emailArray = Object.keys(resp);
		var allEmails = emailArray.join('');
		var search = new RegExp(email);
		var inDataBase = search.test(allEmails);
		if (fn(email) && !inDataBase) {
		    event.target.setCustomValidity('');
		} else {
		    if (!fn(email)) {
			message = email + ' is not an authorized email address';
			event.target.setCustomValidity(message);
		    } else {
			message = email + ' is already registered.';
			event.target.setCustomValidity(message);
		    }
		}
	    });
	});
    };
    
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
