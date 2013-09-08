'use strict';

pointyApp.factory('ReportingService',['Restangular', 'PointyDateService', function (Restangular, PointyDateService) {
	
	/**
	 * Local method to massage the date if needed.
	 */
	function massageDate(aDate){
		//return "Visited on: " + PointyDateService.convertJSONToMMDDYYYYDate(aDate);
		return PointyDateService.convertJSONToMMDDYYYYDate(aDate);
	};

    return {
        getVisitFrequencyList: function() {
        	var baseVisitFrequencyList = Restangular.all("reporting/visitFrequency");
        	
        	var aPromise = baseVisitFrequencyList.getList().then(function(object){
        		//massage data in a format acceptable to the directive
        		var list = [];
        		for (var i = 0; i < object.length; i++){
        			var visitDate = object[i].visitDate;
        			visitDate = massageDate(visitDate); //if necessary
        			var numOfVisits = object[i].numberOfVisits;
        			var o = {"key":visitDate, "value":numOfVisits};
        			list.push(o);
        		}
        		return list;
        	});
        	return aPromise;
        }
    };
}]);
