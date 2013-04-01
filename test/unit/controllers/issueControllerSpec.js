'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('issueController', function(){
    var $scope, user, $location

    beforeEach(function() {
        // user service mock
        user = { login: undefined, name: undefined }

        // issueService mock
        var issueResource = {
            query: function(issue) { }
        }
        spyOn(issueResource, 'query').andReturn([{id:1}, {id: 2}]);

        module(function($provide) {
            //$provide.value('$location', $location);
            $provide.value('issueResource', issueResource);
            $provide.value('user', user);
        });

        // fetch from injector
        inject(function($injector, $controller, $rootScope, _$location_) {
            $controller('issueCtrl', {$scope: $scope = $rootScope.$new()});
            $location = _$location_
        });
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('EXO-4.3: should change location to /user when no login is defined', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;

        expect($location.url()).toEqual('/user');
    });

    it('should load issues from issueResource', function() {
        expect($scope.issues).toEqual([{id:1}, {id: 2}]);
    });
});

