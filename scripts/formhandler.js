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
	var $sliderLabel = $('[for="strengthLevel"]');
	var $slider = $('#strengthLevel');
	var sliderValue = $slider[0].valueAsNumber;
	$sliderLabel.text("Caffeine rating: " + sliderValue);
	changeLabelColor($sliderLabel, sliderValue);
	$slider.on('change', function(event) {
	    changeLabelColor($sliderLabel, event.target.valueAsNumber);
	    $sliderLabel.text("Caffeine rating: " + event.target.value);
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

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
