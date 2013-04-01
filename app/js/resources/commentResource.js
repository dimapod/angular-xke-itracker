'use strict';

bugTrackerApp.factory('commentResource', function ($resource) {
    return $resource('/issue/:issueId/comment');
});
