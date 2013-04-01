'use strict';

bugTrackerApp.controller('editCtrl', function ($scope, user, $routeParams, $location, issueResource, commentResource) {
    // EXO-5.2.1 (init $scope)
    $scope.readonly = true;
    $scope.submitting = false;
    $scope.newComment = { reporter: user.login, date: new Date(), comment: "" }

    // EXO-5.2.2 (Fetch edited issue from issueResource with get)
    $scope.issue = issueResource.get({ id: $routeParams.issueId });

    // EXO-5.2.3 (Fetch comments from commentResource with query)
    $scope.comments = commentResource.query({ issueId: $routeParams.issueId });

    $scope.edit = function () {
        // EXO-5.2.4 (save issue & newComment.
        if ($scope.submitting) return;
        $scope.submitting = true;

        issueResource.save($scope.issue);
        if ($scope.newComment.comment) {
            commentResource.save({issueId: $scope.issue._id}, $scope.newComment);
        }

        // EXO-5.2.4 (change location to /issue)
        $location.url('/issue');
    }
});
