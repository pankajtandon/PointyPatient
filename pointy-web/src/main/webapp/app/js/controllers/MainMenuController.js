'use strict';

pointyApp.controller('MainMenuController',
    function MainMenuController($scope, $location) {

        $scope.registerPatient = function() {
            $location.url('/registerPatient');
        };
        $scope.listPatients = function() {
            $location.url('/patients');
        };
        
       
    });