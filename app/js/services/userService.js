'use strict';

bugTrackerApp.factory('user', function ($rootScope, localStorage) {

    var LOCAL_STORAGE_ID = 'configuration',
        userString = localStorage[LOCAL_STORAGE_ID];

    var configuration = userString ? JSON.parse(userString) : {
        login: undefined,
        name: undefined
    };

    // EXO-2.3 ($watch the 'configuration' value)
    // => localStorage[LOCAL_STORAGE_ID] = JSON.stringify(configuration);

    return configuration;
});