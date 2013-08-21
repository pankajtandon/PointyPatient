'use strict';
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Pointy Patient App E-2-E Tests', function() {
	
	var rootContext = '../../app/index.html';
	var FIRST = "Steely";
	var LAST = "Dan";
	var SOME_DATE = '03/04/2000';

	describe('Pointy Patient App', function() {
		
		it('Should save a patient', function() {
	      browser().navigateTo(rootContext);
	      
		  input('patient.firstName').enter(FIRST);
		  input('patient.lastName').enter(LAST);
		  input('patient.visitDate').enter(SOME_DATE);
		  //pause();
		  element('#save-patient-button').click();
		  expect(element('.ng-scope.ng-binding').text()).toBe("Patient registered successfully! Just went over to pointy-api webapp using Restangular and saved this patient!");
		});
		
		//Learn JQuery!
		xit('Should list the patient', function() {
		      browser().navigateTo(rootContext + "#/patients");
		      
			  //pause();
			  //expect(element('table tr:last children().eq(1)').text()).toBe("Patient registered successfully!");
		});
		
		xit('Should delete a patient', function() {
		      browser().navigateTo(rootContext);
		      
			  input('patient.firstName').enter(FIRST);
			  input('patient.lastName').enter(LAST);
			  input('patient.visitDate').enter(SOME_DATE);
			  //pause();
			  element('#save-patient-button').click();
			  expect(element('.ng-scope.ng-binding').text()).toBe("Patient registered successfully!");
			});
	});	
});
