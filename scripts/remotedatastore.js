(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url) {
	if (!url) {
	    throw new Error('No remote URL supplied.');
	}
	this.serverURL = url;
    }

    RemoteDataStore.prototype.add = function(key, val) {
	return $.post(this.serverURL, val, function(serverResponse) {
	    console.log(serverResponse);
	});
    };

    RemoteDataStore.prototype.getAll = function(key, cb) {
	return $.get(this.serverURL, function(serverResponse) {
	    if (cb) {
		console.log(serverResponse);
		cb(serverResponse);
	    }
	});
    };

    RemoteDataStore.prototype.get = function(key, cb) {
	return $.get(this.serverURL + '/' + key, function (serverResponse) {
	    if (cb) {
		console.log(serverResponse);
		cb(serverResponse);
	    }
	});
    };

    RemoteDataStore.prototype.remove = function(key) {
	return $.ajax(this.serverURL + '/' + key, {
	    type: 'DELETE'
	});
    };

    RemoteDataStore.prototype.connectionExists = function() {
	// Code from https://www.kirupa.com/html5/check_if_internet_connection_exists_in_javascript.htm
	var xhr = new XMLHttpRequest(); 
	xhr.open('HEAD', this.serverURL, false); // synchronous XMLHttpRequest deprecated
	try {
	    xhr.send();
	    if (xhr.status >= 200 && xhr.status < 304) {
		return true;
	    } else {
		return false;
	    }
	} catch (e) {
	    return false;
	}
    };
    
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);
