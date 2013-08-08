'use strict';

describe('PatientController Tests', function() {
    
    var patient = null;
    var localScope = null;
    var localPatientController = null;
    var localPatientService = null;
    var localRouteParams = null;
    var deferred = null;
    var form = null;
    
    beforeEach(module('pointyApp'));
	beforeEach(inject(function($rootScope, $controller, PatientService, $routeParams, $q) {
		patient = {"id":"1", "firstName":"Joe", "lastName":"Longfellow", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
	    localScope = $rootScope.$new();
	    localPatientService = PatientService;
	    localRouteParams = $routeParams;			    
	    localPatientController = $controller('PatientController', 
	    		{ $scope: localScope, PatientService: localPatientService, $routeParams: localRouteParams } );
	    deferred = $q.defer();
	}));
	
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
		
    describe('PatientController injection tests', function() {    

		it('should inject patient controller', function() {
			expect(localPatientController).toBeDefined();
		});	
		
		it('should set showFeedback correctly', function() {
			expect(localScope.showFeedback).toBe(false);
		});	
    });

    describe('PatientController save patient tests', function() {    
		//Solution based on: https://groups.google.com/forum/#!msg/angular/icQGGKZy-Is/zwnmZZdfT-0J
		it('should save patient', inject(function($rootScope, $compile) {	
			form = {$valid:true};
		    deferred.resolve({"id":"xyz"});
		    spyOn(localPatientService, "save").andReturn(deferred.promise);			
			localScope.savePatient(patient, form);
			$rootScope.$digest();
			expect(patient.id).toBe("xyz");
			expect(localScope.alertType).toBe("success");
		}));
		
		it('should not save patient', inject(function($rootScope, $compile) {
			form = {$valid:true};
		    deferred.reject({});
		    spyOn(localPatientService, "save").andReturn(deferred.promise);			
			localScope.savePatient(patient, form);
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));
		
		it('Invalid form and should not save patient', inject(function($rootScope, $compile) {
			form = {$valid:false};
		    spyOn(localPatientService, "save");		
			localScope.savePatient(patient, form);
			expect(localPatientService.save).not.toHaveBeenCalled();
			expect(localScope.alertType).toBe("error");
		}));
		
    });

    
    describe('PatientController list patient tests', function() {    
		
		it('should list patients == 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":0});
		    spyOn(localPatientService, "list").andReturn(deferred.promise);			
			localScope.listPatients();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("warning");
		}));
		
		it('should list patients > 0', inject(function($rootScope, $compile) {		    
		    deferred.resolve({"length":10});
		    spyOn(localPatientService, "list").andReturn(deferred.promise);			
			localScope.listPatients();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("info");
		}));		
    });

    
    describe('PatientController patient detail tests', function() {    
		beforeEach(inject(function($rootScope, $controller, PatientService, $routeParams) {
			    localRouteParams = {"patientId":"1"};
			    localPatientController = $controller('PatientController', 
			    		{ $scope: localScope, PatientService: localPatientService, $routeParams: localRouteParams } );
			    
		}));
		
		it('should show patient details', inject(function($rootScope, $compile) {			
		    deferred.resolve({"originalElement":patient});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localPatientService, "patientDetail").andReturn(aTempObject);
			localScope.patientDetail();
			$rootScope.$digest();
			expect(localScope.patient).toBe(patient);
		}));
		
		it('should not show patient details', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localPatientService, "patientDetail").andReturn(aTempObject);
			localScope.patientDetail();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));		
    });
    
    
    describe('PatientController patient deletion tests', function() {    
		beforeEach(inject(function($rootScope, $controller, PatientService, $routeParams) {
			    localRouteParams = {"patientId":"1"};
			    localPatientController = $controller('PatientController', 
			    		{ $scope: localScope, PatientService: localPatientService, $routeParams: localRouteParams } );
			    
		}));
		
		it('should delete patients', inject(function($rootScope, $compile) {			
		    deferred.resolve({"originalElement":patient});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localPatientService, "deletePatient").andReturn(aTempObject);
			localScope.deletePatient();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("info");
		}));
		
		it('should not delete patients', inject(function($rootScope, $compile) {			
		    deferred.reject({});
		    var aTempObject = {get: function(){return deferred.promise}};
		    spyOn(localPatientService, "deletePatient").andReturn(aTempObject);
			localScope.deletePatient();
			$rootScope.$digest();
			expect(localScope.alertType).toBe("error");
		}));		
    });

});
