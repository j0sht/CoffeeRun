(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var $sliderLabel = $('[for="strengthLevel"]');
    var $slider = $('#strengthLevel');
    var START_VAL = $slider[0].valueAsNumber;
    updateLabelWithValue(START_VAL);
    
    function FormHandler(selector) {
	// Code will go here
	if (!selector) {
	    throw new Error('No selector provided');
	}
	this.$formElement = $(selector);
	if (this.$formElement.length === 0) {
	    throw new Error('Could not find element with selector: ' + selector);
	}
	this.$formElement.bind('reset', function() {
	    updateLabelWithValue(START_VAL);
	});
	$slider.on('change', function(event) {
	    updateLabelWithValue(event.target.valueAsNumber);
	});
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

    function changeLabelColor($label, num) {
	var color;
	if (num > 66) {
	    color = 'red';
	} else if (num > 33) {
	    color = '#FFD842';
	} else {
	    color = 'green';
	}
	$label.css('color', color);
    }

    function updateLabelWithValue(val) {
	$sliderLabel.text("Caffeine rating: " + val);
	changeLabelColor($sliderLabel, val);
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
