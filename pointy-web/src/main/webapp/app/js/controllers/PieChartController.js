'use strict';

pointyApp.controller('PieChartController', ['$scope', 'ReportingService', function ChartController ($scope, ReportingService) {

  $scope.chartData = ReportingService.getVisitFrequencyList();
	  
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
