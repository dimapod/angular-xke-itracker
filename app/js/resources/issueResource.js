'use strict';

bugTrackerApp.factory('issueResource', function ($resource) {
    return $resource('/issue/:id', {id:'@_id'});
});
