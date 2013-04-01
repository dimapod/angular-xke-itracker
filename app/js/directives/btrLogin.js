'use strict';

bugTrackerApp.directive('btrLogin', function () {
    return {
        restrict: 'E',
        scope: {},
        controller: function FmDeliverToController($scope) { // EXO-4.1 (injection)
            // EXO-4.1
        },
        template:
            "<div class='btr-login'>" +
                "{{user.login}} | <a href='#/user'>Logout</a>" +
            "</div>"
    };
});
