'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('EXO-3.2.x: addIssueController', function(){
    var $scope, user, issueResourceSpy, $location

    beforeEach(function() {
        // user service mock
        user = { login: "testLogin", name: "Test User Name" }

        // issueResource mock
        var issueResource = {
            save: function(issue) { }
        }
        issueResourceSpy = spyOn(issueResource, 'save')

        module(function($provide) {
            $provide.value('issueResource', issueResource);
            $provide.value('user', user);
        });

        // fetch from injector
        inject(function($injector, $controller, $rootScope, _$location_) {
            $controller('addCtrl', {$scope: $scope = $rootScope.$new()});
            $location = _$location_
        });
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('EXO-3.2.1: should set default values to $scope', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;

        expect($scope.readonly).toBe(false);
        expect($scope.submitting).toBe(false);

        expect($scope.issue.reporter).toBe("testLogin");
        expect($scope.issue.status).toBe("new");
        expect($scope.issue.date).toBeDefined();
    });

    it('should have add() method defined', function() {
        expect($scope.add).toBeDefined();
    });

    it('should not save new issue when submitting is already in progress', function() {
        $scope.submitting = true;
        $scope.add();
        expect(issueResourceSpy).not.toHaveBeenCalled();
    });

    it('EXO-3.2.2: should save a new issue', function() {
        $scope.add();

        expect($scope.submitting).toBe(true);
        expect(issueResourceSpy).toHaveBeenCalledWith($scope.issue);
    });

    it('EXO-3.2.2: should change location when issue is saved', function() {
        $scope.add();
        expect($location.url()).toEqual('/issue');
    });

});

