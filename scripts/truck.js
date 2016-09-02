(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckID, db) {
	this.truckID = truckID;
	this.db = db;
    };

    Truck.prototype.createOrder = function(order) {
	console.log('Adding order for ' + order.emailAddress);
	return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
	console.log('Delivering order for ' + customerId);
	return this.db.remove(customerId);
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
