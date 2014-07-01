'use strict';

pointyApp.factory('PatientService',['Restangular', 'PointyDateService', function (Restangular, PointyDateService) {
	
	/**
	 * Local method to massage the date if needed.
	 */
	function massageDate(aDate){
		return PointyDateService.convertToTimeAgo(aDate);
	};

    return {
        save: function(patient) {
        	var basePatients = Restangular.all("patients");
        	var originalDate = patient.visitDate;
        	patient.visitDate = PointyDateService.convertMMDDYYYYToJSONDate(originalDate);
        	
        	var aPromise = basePatients.post(patient);
        	patient.visitDate = originalDate;
        	return aPromise;

        },
        list: function() {
        	var basePatients = Restangular.all("patients");
        	
        	var aPromise = basePatients.getList().then(function(object){
        		for (var i = 0; i < object.length; i++){
        			var patient = object[i];
        			var readableDate = massageDate(patient.visitDate);	
        			patient.visitDate = readableDate;
        		}
        		return object;
        	});
        	return aPromise;
        },
        patientDetail: function(id){
        	return Restangular.one("patients", id);
        	
        },
        deletePatient: function(id){
        	return Restangular.one("patients", id).remove();
        }
    };
}]);
