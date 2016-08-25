(function (window) {

    'use strict';

    var App = window.App || {};

    function DataStore() { // think of DataStore as a class
	this.data = {}; // Adding a property to DataStore
    };

    DataStore.prototype.add = function(key, val) {
	this.data[key] = val;
    };

    DataStore.prototype.get = function(key) {
	return this.data[key];
    };

    DataStore.prototype.getAll = function() {
	return this.data;
    };

    DataStore.prototype.remove = function(key) {
	delete this.data[key];
    };
    
    App.DataStore = DataStore;
    window.App = App;
    
})(window);
