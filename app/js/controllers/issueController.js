'use strict';

bugTrackerApp.controller('issueCtrl', function ($scope, user, $location, issueResource) {
    // EXO-4.3 (redirect to /user if not logged in)
    if (!user.login) {
        $location.url('/user');
    }

    $scope.issues = issueResource.query();
});
