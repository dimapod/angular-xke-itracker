'use strict';

// $scope & $location injected angular services, "user" - service defined in userService.js
bugTrackerApp.controller('userCtrl', function CustomerController($scope, $location, user) {

    // EXO-2.2.1 ($scope init)
    $scope.login = user.login;
    $scope.name = user.name;

    $scope.doLogin = function (login, name) {
        // EXO-2.2.2
        user.login = login;
        user.name = name;

        // EXO-2.2.3 ($location)
        $location.url('/');
    };
});
