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

    CheckList.prototype.addClickHandler = function(fn) {
	this.$element.on('click', 'input', function(event) {
	    var email = event.target.value;
	    fn(email).then(function () {
		this.removeRow(email);
	    }.bind(this));;
	}.bind(this));
    };
    
    CheckList.prototype.addRow = function(coffeeOrder) {
	// Remove existing rows that match the email address
	this.removeRow(coffeeOrder.emailAddress);
	// Create new Row
	var rowElement = new Row(coffeeOrder);
	// Append to CheckList $element
	this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function(email) {
	this.$element
	    .find('[value="' + email + '"]')
	    .closest('[data-coffee-order="checkbox"]')
	    .remove();
    };
    
    // Row(cO) is a private function; not exported to the App namespace
    function Row(coffeeOrder) {
	var $div = $('<div></div>', {
	    'data-coffee-order': 'checkbox',
	    'class': 'checkbox'
	});

	var $label = $('<label></label>');

	var $checkbox = $('<input></input>', {
	    type: 'checkbox',
	    value: coffeeOrder.emailAddress
	});

	var description = coffeeOrder.size + ' ';
	if (coffeeOrder.flavor) {
	    description += coffeeOrder.flavor + ' ';
	}
	description += coffeeOrder.coffee + ', ';
	description += ' (' + coffeeOrder.emailAddress + ')';
	description += ' [' + coffeeOrder.strength + 'X]';

	$label.append($checkbox);
	$label.append(description);
	$div.append($label);

	this.$element = $div;
    }
    
    App.CheckList = CheckList;
    window.App = App;
})(window);
