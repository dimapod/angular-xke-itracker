'use strict';

bugTrackerApp.controller('issueCtrl', function ($scope, user, $location, issueResource) {
    // EXO-4.3 (redirect to /user if not logged in)

    $scope.issues = issueResource.query();
});
