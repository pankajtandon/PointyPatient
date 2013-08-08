'use strict';

pointyApp.directive('DatePicker',[ function () {
    return {
    	restrict: 'A',
    	link: function (scope, element) {
    		element.datepicker();
    	}
    }
}]);
 
