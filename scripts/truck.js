(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var SIZES = {
	'short': 1,
	'tall': 2,
	'grande': 3
    };
    var largestSize = 0;
    var strongest = 0;
    var MODAL_BODY_TEXT = $('#myModal').find('.modal-body').html();
    function Truck(truckID, db) {
	this.truckID = truckID;
	this.db = db;
    };

    Truck.prototype.createOrder = function(order) {
	console.log('Adding order for ' + order.emailAddress);
	this.db.add(order.emailAddress, order);
	if (SIZES[order.size] > largestSize
	    && parseInt(order.strength) > strongest
	    && order.flavor !== "") {
	    largestSize = SIZES[order.size];
	    strongest = parseInt(order.strength);
	    var $modal = $('#myModal');
	    var $noBtn = $modal.find('.btn-default');
	    var $yesBtn = $modal.find('.btn-primary');
	    $noBtn.text('No');
	    $yesBtn.text('Yes');
	    $modal.find('.modal-body').empty();
	    $modal.find('.modal-body').append(MODAL_BODY_TEXT);
	    $modal.modal('show');
	    if (order.emailAddress !== "") {
		$yesBtn.on('click', function(e) {
		    $modal.find('.modal-body').append(
			'<h3>Choose power up:</h3>'
		    );
		    $modal.find('.modal-body').append(
			'<div class="radio">\n' +
			    '<label>\n' +
			    '<input type="radio" name="size" value="short">\n' +
			    'Time Travel\n' +
			    '</label>\n' + 
			    '</div>\n' +
			    '<div class="radio">\n' +
			    '<label>\n' +
			    '<input type="radio" name="size" value="tall" checked>\n' +
			    'Mind Reading\n'+
			    '</label>\n' +
			    '</div>\n' +
			    '<div class="radio">\n' +
			    '<label>\n' +
			    '<input type="radio" name="size" value="grande">\n' +
			    'Bug Free Code\n' +
			    '</label>\n' +
			    '</div>');
		    $yesBtn.text('Choose')
		    $noBtn.text('Close');
		    $yesBtn.unbind('click');
		});
	    }
	}
    };

    Truck.prototype.deliverOrder = function(customerId) {
	console.log('Delivering order for ' + customerId);
	this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
	var customerIDArray = Object.keys(this.db.getAll());

	console.log('Truck #' + this.truckID + ' has pending orders:');
	customerIDArray.forEach(function(id) {
	    console.log(this.db.get(id));
	}.bind(this));
    };
    
    App.Truck = Truck;
    window.App = App;
})(window);
