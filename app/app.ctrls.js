app.controller("formForm", ['Soil', '$firebaseObject', '$scope', function(Soil, $firebaseObject, $scope){
	var formCtrl = this;
	this.saveData = function(title){
		var formId = title.replace(/[^a-z0-9]/gi, '').toLowerCase();
		var date = Date.now();
		var dateID = date.toString();
		var newForm = Soil.put('createdtime', date, dateID, 'form', title, formId);
		formCtrl.formTitle = '';
	};
	var ref = new Firebase(Soil.url);
	var obj = $firebaseObject(ref.child('form'));
	// The $loaded() promise signifies that the initial state has been downloaded
	obj.$loaded().then(function() {
		angular.forEach(obj, function(value, key) {
			console.log(key+" - "+value);
			angular.forEach(value.createdtime, function(timeValue, timeKey){
				console.log(timeKey +" - "+ timeValue);
				obj[key].time = timeKey;
			});
		});
		console.log("forms loaded");
	});
	obj.$bindTo($scope, "forms");
}])
.controller("formData", ['Soil', function(Soil){
}])
.controller("HomeCtrl", ["Soil", function(Soil){
}]);