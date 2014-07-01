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
    		},
    		convertToTimeAgo: function(originalDate){
    			  	var date = new XDate(originalDate);
    			  
    			  
    			  	var seconds = Math.floor((new Date() - date) / 1000);

    			  	if (seconds < 0) {
    			  		return this.convertJSONToMMDDYYYYDate(originalDate);
    			  	}
    			  	
    			    var interval = Math.floor(seconds / 31536000);

    			    if (interval > 1) {
    			        return interval + " years ago";
    			    }
    			    interval = Math.floor(seconds / 2592000);
    			    if (interval > 1) {
    			        return interval + " months ago";
    			    }
    			    interval = Math.floor(seconds / 86400);
    			    if (interval > 1) {
    			        return interval + " days ago";
    			    }
    			    interval = Math.floor(seconds / 3600);
    			    if (interval > 1) {
    			        return interval + " hours ago";
    			    }
    			    interval = Math.floor(seconds / 60);
    			    if (interval > 1) {
    			        return interval + " minutes ago";
    			    }
    			    return Math.floor(seconds) + " seconds ago";
    		}
    };
});
