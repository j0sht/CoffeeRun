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
	console.log($slider);
	$sliderLabel.text("Caffeine rating: " + $slider[0].value);
	$slider.on('change', function(event) {
	    if (event.target.valueAsNumber > 66) {
		$sliderLabel.css('color', 'red');
	    } else if (event.target.valueAsNumber > 33) {
		$sliderLabel.css('color', '#FFD842');
	    } else {
		$sliderLabel.css('color', 'green');
	    }
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

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
