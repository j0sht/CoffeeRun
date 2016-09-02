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
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    window.checkList = checkList;
    var myTruck;
    remoteDS.getAll('').then(function() {
	myTruck = new Truck('ncc-1701', remoteDS);
	window.myTruck = myTruck;
    }, function() {
	myTruck = new Truck('ncc-1701', new DataStore());
	window.myTruck = myTruck;
    }).then(function() {
	checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
	var formHandler = new FormHandler(FORM_SELECTOR);
	
	formHandler.addSubmitHandler(function(data) {
	    return myTruck.createOrder.call(myTruck, data).
		then(function () {
		    checkList.addRow.call(checkList, data);
		});
	});
	formHandler.addInputHandler(Validation.isCompanyEmail);
	myTruck.printOrders(checkList.addRow.bind(checkList));
    }).then(function() { myTruck.printOrders(checkList.addRow.bind(checkList)); });
})(window);
