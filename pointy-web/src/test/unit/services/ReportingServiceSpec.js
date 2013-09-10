'use strict';

describe('ReportingService Tests', function() {
    
	beforeEach(module('pointyApp'));
 
    var localRestangular;
    var localReportingService;
    var deferred = null;
    var visitFrequency1 = null;
    var visitFrequency2 = null;
    var visitFrequency3 = null;
    var visitFrequency4 = null;
    var visitFrequencies = [];
    
    var injectRestangular = inject(function(Restangular, $q) {	    		
		localRestangular = Restangular;
	    //Set mocks
	    deferred = $q.defer();
	    spyOn(Restangular, "all").andReturn({
	    	getList: function(){
	    		return deferred.promise;
	    	}
	    });
    });
    
    var injectReportingService = inject(function(ReportingService) {	    		
    	localReportingService = ReportingService;
    });
    
    describe('Dependency Injection tests', function() {   
    	
        beforeEach(function() {          
            injectRestangular();
            injectReportingService();
        });
    	
    	it('should inject deps', function() {
    		expect(localReportingService).toBeDefined();
    		expect(localRestangular).toBeDefined();
    	});	
    });
    
    
    describe('Retrieving chart data', function() {   
    	
        beforeEach(inject(function(Restangular,  ReportingService) {     	    
            injectRestangular();
            injectReportingService();
    	    

            visitFrequency1 = {"visitDate":"03/04/2000", "numberOfVisits":"9"};
            visitFrequency2 = {"visitDate":"03/05/2004", "numberOfVisits":"1"};
            visitFrequency3 = {"visitDate":"03/06/2001", "numberOfVisits":"3"};
            visitFrequency4 = {"visitDate":"03/04/2013", "numberOfVisits":"5"};
            visitFrequencies = [visitFrequency1, visitFrequency2, visitFrequency3, visitFrequency4];
            
            deferred.resolve(visitFrequencies);
        }));
    	
		it('should list visitFrequencies', inject(function($rootScope) {
			var aPromise = localReportingService.getVisitFrequencyList();
			expect(localRestangular.all(jasmine.any(Object)).getList()).toBe(deferred.promise);
			aPromise.then(function(o2){
        		expect(o2.length).toBe(4);

        		var confirmFreq = 0;
        		for (var i = 0; i < 4; i++){
        			confirmFreq = confirmFreq + parseInt(o2[i].value);
        		}
        		expect(confirmFreq).toBe(18);
        	});
			$rootScope.$digest();
			
		}));    
		
		it('should sorts visitFrequencies by date ascending ', inject(function($rootScope) {
			var aPromise = localReportingService.getVisitFrequencyList();
			expect(localRestangular.all(jasmine.any(Object)).getList()).toBe(deferred.promise);
			aPromise.then(function(o2){
        		expect(o2[1].key).toBe("2001-03-06"); //second element
        		expect(o2[2].key).toBe("2004-03-05"); //third element
        	});
			$rootScope.$digest();
			
		})); 
    });
    
    
	afterEach(function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
	});
});