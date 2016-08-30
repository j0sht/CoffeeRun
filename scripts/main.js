(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var RemoteDataStore = App.RemoteDataStore;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    window.remoteDS = remoteDS;
    var formHandler = new FormHandler(FORM_SELECTOR);
    var registeredEmails;
    remoteDS.getAll('', function(resp) {
	registeredEmails = Object.keys(resp);
    });
    var myTruck = new Truck('ncc-1701', remoteDS);
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    formHandler.addSubmitHandler(function(data) {
	myTruck.createOrder.call(myTruck, data);
	checkList.addRow.call(checkList, data);
	remoteDS.getAll('', function(resp) {
	    registeredEmails = Object.keys(resp);
	});
    });
    formHandler.addInputHandler(Validation.isCompanyEmail, function(email) {
	console.log(registeredEmails.length);
	for (var i = 0; i < registeredEmails.length; i++) {
	    if (registeredEmails[i] === email) {
		return false;
	    }
	}
	return true;
    });	
})(window);
