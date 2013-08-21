'use strict';

pointyApp.controller('PatientController',
    function PatientController($scope, PatientService, $routeParams) {
	    $scope.showFeedback = false;
	    	    
	    /**
	     * Save a patient
	     */
	    $scope.savePatient = function (patient, form) {
        	console.log(patient);
        	
            if(form.$valid) {
            	var aPromise = PatientService.save(patient);
            	aPromise.then(function(object){
            		patient.id = object.id;
            		showAlert("success", "Patient registered successfully! Just went over to pointy-api webapp using Restangular and saved this patient!");
            	}, function errorCallback(error) {
            		showAlert("error", error);
            	});
            } else {
            	showAlert("error", "Invalid form: " + form);
            }
        };
        
        /**
         * List patients
         */
        $scope.listPatients = function(){
        	PatientService.list().then(function(o){
        		$scope.patientList = o;
        		if (o.length == 0){
        			showAlert("warning", "No patients registered! Checked for patients by making a call to pointy-api webapp using Restangular!");
        		} else {
        			showAlert("info", "Found " + o.length + " patients! Checked for patients by making a call to pointy-api webapp using Restangular!");
        		}
        	}, function(e){
        		showAlert("error", e);
        	});
        };
        
        /**
         * Retrieve one patient
         */
        $scope.patientDetail = function(){
        	if ($routeParams != undefined && $routeParams.patientId != undefined){
        		PatientService.patientDetail($routeParams.patientId).get().then(function(object) {
        			$scope.patient  = object.originalElement;        		
	        	}, function(e){
	        		showAlert("error", "Error retrieving patient " + e);
	        	});
        	}
        };
        
        /**
         * Delete one patient
         */
        $scope.deletePatient = function () {
        	if ($routeParams != undefined && $routeParams.patientId != undefined){
        		PatientService.deletePatient($routeParams.patientId).get().then(function(object) {
        			$scope.patient  = {};
        			showAlert("info", "Deleted patient with Id: "+ $routeParams.patientId );
	        	}, function(e){
	        		showAlert("error", "Error deleting patient. "+ e);
	        	});
        	}
        };

        /**
         * Clear the patient object
         */
        $scope.newPatient = function (patient) {
        	$scope.patient = {};
        	this.closeAlert();
        };
        
        $scope.closeAlert = function(){
        	$scope.showFeedback = false;
        };
        
        function showAlert(type, message) {
    		$scope.status  = message;
    		$scope.showFeedback = "true";
    		$scope.alertType = type;
        }
    }
);