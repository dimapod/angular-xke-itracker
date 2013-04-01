'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('EXO-5.2.x: editController', function(){
    var $scope, user, issueResourceSaveSpy, issueResourceGetSpy, commentResourceQuerySpy, commentResourceSpy, $location

    var ISSUE = { "id": 131, "reporter": "ted", "product": "Windows", "version": "8", "severity": "crash", "priority": 1, "summary": "Metro's buggy", "description": "Crashes all the time. Please use only one interface for your products.", "status": "new" }
    var COMMENTS = [ { "reporter": "dpodyach", "date": "2013-03-26T23:20:03.609Z", "comment": "" }, { "reporter": "dpodyach", "date": "2013-03-26T23:30:35.410Z", "comment": "Test" } ];

    beforeEach(function() {
        // user service mock
        user = { login: "testLogin", name: "Test User Name" }
        var $routeParams = {issueId: 10}

        // issueResource mock
        var issueResource = {
            save: function(issue) {},
            get: function() { return ISSUE }
        }
        issueResourceSaveSpy = spyOn(issueResource, 'save')
        issueResourceGetSpy = spyOn(issueResource, 'get').andCallThrough()

        // commentResource mock
        var commentResource = {
            query: function() { return COMMENTS },
            save: function(param, comment) {}
        }
        commentResourceQuerySpy = spyOn(commentResource, 'query').andCallThrough()
        commentResourceSpy = spyOn(commentResource, 'save')

        module(function($provide) {
            $provide.value('issueResource', issueResource);
            $provide.value('commentResource', commentResource);
            $provide.value('user', user);
            $provide.value('$routeParams', $routeParams);
        });

        // fetch from injector
        inject(function($injector, $controller, $rootScope, _$location_) {
            $controller('editCtrl', {$scope: $scope = $rootScope.$new()});
            $location = _$location_
        });
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('EXO-5.2.1: should set default values to $scope', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;

        expect($scope.readonly).toBe(true);
        expect($scope.submitting).toBe(false);

        expect($scope.issue.reporter).toBe("ted");
        expect($scope.issue.status).toBe("new");
    });

    it('EXO-5.2.1: should have $scope.newComment defined', function() {
        expect($scope.newComment).toBeDefined();
        expect($scope.newComment.reporter).toBe('testLogin');
        expect($scope.newComment.date).toBeDefined();
    });

    it('EXO-5.2.2: should fetch edited issue from resource', function() {
        expect($scope.issue).toBe(ISSUE);
        expect(issueResourceGetSpy).toHaveBeenCalledWith({ id: 10 })
    });

    it('EXO-5.2.3: should fetch issue comments from resource', function() {
        expect($scope.comments).toBe(COMMENTS);
        expect(commentResourceQuerySpy).toHaveBeenCalledWith({ issueId : 10 })
    });

    it('should have edit() method defined', function() {
        expect($scope.edit).toBeDefined();
    });

    it('EXO-5.2.4: should not save new issue when submitting is already in progress', function() {
        $scope.submitting = true;
        $scope.edit();
        expect(issueResourceSaveSpy).not.toHaveBeenCalled();
        expect(commentResourceSpy).not.toHaveBeenCalled();
    });

    it('EXO-5.2.4: should edit an issue without comment', function() {
        $scope.edit();

        expect($scope.submitting).toBe(true);
        expect(issueResourceSaveSpy).toHaveBeenCalledWith($scope.issue);

        // Comment is empty (=> not to save)
        expect(commentResourceSpy).not.toHaveBeenCalled();
    });

    it('EXO-5.2.4: should edit an issue with comment', function() {
        $scope.newComment.comment = "Comment";
        $scope.edit();

        expect($scope.submitting).toBe(true);
        expect(issueResourceSaveSpy).toHaveBeenCalledWith($scope.issue);

        // Comment is filled (=> save)
        expect(commentResourceSpy).toHaveBeenCalled();
    });

    it('EXO-5.2.4: should change location when issue is saved', function() {
        $scope.edit();
        expect($location.url()).toEqual('/issue');
    });

});

