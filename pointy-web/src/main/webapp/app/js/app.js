'use strict';

var pointyApp = angular.module('pointyApp', ['restangular', 'ui.bootstrap'])
				.config(function ($routeProvider, RestangularProvider, $locationProvider) {
					
					//RestangularProvider.setBaseUrl('http://localhost:8080/pointy-api');
					RestangularProvider.setBaseUrl("${RestEndpoint}");
					
					RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
					  var newResponse = response.payload;
					  if (angular.isArray(newResponse)) {
						    angular.forEach(newResponse, function(value, key) {
						    	if (newResponse[key] != undefined){
						    		newResponse[key].originalElement = angular.copy(value);
						    	}
						    });
					  } else {
						  if (newResponse != undefined) {
							  newResponse.originalElement = angular.copy(newResponse);
					  	  }
					  }						
					  return newResponse;
					  
				    });
				    
					$routeProvider.when('/registerPatient',
				        {
				            templateUrl:'views/Patient.html',
				            controller: 'PatientController'
				        });
				    $routeProvider.when('/patients',
				        {
				            templateUrl: 'views/PatientList.html',
				            controller: 'PatientController'
				        });
				    $routeProvider.when('/patientDetail/:patientId',
				        {
				            templateUrl: 'views/Patient.html',
				            controller: 'PatientController'
				        });						    
				    $routeProvider.when('/pointyPieChart',
				        {
				            templateUrl: 'views/PieChart.html',
				            controller: 'PieChartController'
				        });				    
				    $routeProvider.when('/pointyBarChart',
				        {
				            templateUrl: 'views/BarChart.html',
				            controller: 'BarChartController'
				        });	
				    $routeProvider.otherwise({redirectTo: '/registerPatient'});
				    //$locationProvider.html5Mode(true);
});