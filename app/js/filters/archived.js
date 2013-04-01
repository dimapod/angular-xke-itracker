'use strict';

bugTrackerApp.filter('archived', function() {
    var STATUS_ARCHIVED = 'archived';

    return function(input, show) {
        var out = [];

        // EXO-6.3.1
        // (filter input:
        //   if (show == true) => only archived issues
        //   if (show == false) => all but archived issues )
        // you can use angular.forEach(arr, fn)

        angular.forEach(input, function(element) {
            out.push(element);
        });

        return out;
    };
});