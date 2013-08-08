'use strict';

/**
 * This class contains utils that deal with dates.
 */

pointyApp.factory('PointyDateService', function () {
    return {
    		convertMMDDYYYYToJSONDate: function(originalDate) {
	        	var mmddyyyy = new XDate(originalDate); 
	        	var jsonDate = mmddyyyy.toString("yyyy-MM-dd")
	        	return jsonDate;
    		},
    		convertJSONToMMDDYYYYDate: function(jsonDate) {
	        	var mmddyyyy = new XDate(jsonDate); 
	        	var jsonDate = mmddyyyy.toString("yyyy-MM-dd")
	        	return jsonDate;
    		}
    };
});
