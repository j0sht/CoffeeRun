(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var App = window.App;
    var $ = window.jQuery
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    // Silver Challenge
    var $sliderLabel = $('[for="strengthLevel"]');
    var $slider = $('#strengthLevel');
    var sliderValue = $slider[0].valueAsNumber;
    $sliderLabel.text("Caffeine rating: " + sliderValue);
    changeLabelColor($sliderLabel, sliderValue);
    $slider.on('change', function(event) {
	changeLabelColor($sliderLabel, event.target.valueAsNumber);
	$sliderLabel.text("Caffeine rating: " + event.target.value);
    });
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
})(window);
