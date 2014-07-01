'use strict';

describe('PatientService Tests', function() {
    
	beforeEach(module('pointyApp'));
 
    var localRestangular;
    var localPatientService;
    var localPointyDateService;
    var localDateConvertorSpy;
    var deferred = null;
    var patient = null;
    var patient2 = null;
    var patient3 = null;
    var patients = [];
    
    var injectRestangular = inject(function(Restangular, $q) {	    		
		localRestangular = Restangular;
	    //Set mocks
	    deferred = $q.defer();
	    spyOn(Restangular, "all").andReturn({
	    	post: function(){
	    		return deferred.promise;
	    	},
	    	getList: function(){
	    		return deferred.promise;
	    	}
	    });
    });
    
    var injectPatientService = inject(function(PatientService) {	    		
    	localPatientService = PatientService;
    });
    
    describe('Dependency Injection tests', function() {   
    	
        beforeEach(function() {          
            injectRestangular();
            injectPatientService();
        });
    	
    	it('should inject deps', function() {
    		expect(localPatientService).toBeDefined();
    		expect(localRestangular).toBeDefined();
    	});	
    });
    
    
    describe('Saving a patient', function() {   
    	
        beforeEach(inject(function(Restangular, $q, PointyDateService, PatientService) {    
    	    localPointyDateService = PointyDateService;   	    
            injectRestangular();
            injectPatientService();
    	    deferred.resolve(patients);
    	    
    	    spyOn(localPointyDateService, "convertMMDDYYYYToJSONDate");
    	    localDateConvertorSpy = spyOn(localPointyDateService, "convertToTimeAgo");

            patient = {"id":"1", "firstName":"Joe", "lastName":"Longfellow", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
            patient2 = {"id":"2", "firstName":"Joe2", "lastName":"Longfellow2", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
            patient3 = {"id":"3", "firstName":"Joe3", "lastName":"Longfellow3", "visitDate":"03/04/2000", "address":"anAddress", "city":"aCity", "state":"aState"};
            
            patients = [patient, patient2, patient3];
        }));
    	
		
		it('should save patient', function() {
			var returnValue = localPatientService.save(patient);
			expect(localRestangular.all(jasmine.any(Object)).post()).toBe(deferred.promise);
			expect(localPointyDateService.convertMMDDYYYYToJSONDate).toHaveBeenCalledWith(patient.visitDate);
			expect(returnValue).toBe(deferred.promise);
			
		});
		it('should list patients', inject(function($rootScope, $compile) {
			var returnValue = localPatientService.list();
			$rootScope.$digest();
			expect(localRestangular.all(jasmine.any(Object)).getList()).toBe(deferred.promise);
			expect(localDateConvertorSpy.callCount).toEqual(3);
			
		}));    	
    });
    
    
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
});