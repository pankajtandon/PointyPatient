'use strict';

pointyApp.controller('PieChartController', ['$scope',  'ReportingService', function PieChartController ($scope, ReportingService) {

    var aPromise = ReportingService.getVisitFrequencyList();
	aPromise.then(function(object){
		$scope.chartData = object;
	}, function errorCallback(error) {
		showAlert("error", error);
	});	  
	
    $scope.closeAlert = function(){
    	$scope.showFeedback = false;
    };
    
    function showAlert(type, message) {
		$scope.status  = message;
		$scope.showFeedback = "true";
		$scope.alertType = type;
    }
	  /*
	  [
	   {"key":"one", "value": "10"},
	   {"key":"two", "value": "30"},
	   {"key":"three", "value": "20"},
	   {"key":"four", "value": "5"},
	   {"key":"five", "value": "15"},
	   {"key":"six", "value": "20"},
	   {"key":"seven", "value": "10"}
	   ];
	   */
}]);
