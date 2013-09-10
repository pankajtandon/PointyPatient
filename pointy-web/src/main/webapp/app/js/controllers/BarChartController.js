'use strict';

pointyApp.controller('BarChartController', ['$scope', 'ReportingService', function BarChartController($scope, ReportingService) {
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
}]);
