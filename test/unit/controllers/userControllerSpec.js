'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('EXO-2.x: userController', function(){
    var $scope, user, $location

    beforeEach(function() {
        // user service mock
        user = { login: "testLogin", name: "Test User Name" }

        module(function($provide) {
            $provide.value('user', user);
        });

        // fetch from injector
        inject(function($injector, $controller, $rootScope, _$location_) {
            $controller('userCtrl', {$scope: $scope = $rootScope.$new()});
            $location = _$location_;
        });
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('EXO-2.2.1: should set login and name to $scope from user service', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;

        expect($scope.login).toBe('testLogin');
        expect($scope.name).toBe('Test User Name');
    });

    it('should have doLogin() method defined', function() {
        expect($scope.doLogin).toBeDefined();
    });

    it('EXO-2.2.2: should set login and name to user service from $scope', function() {
        $scope.doLogin("newLogin", "New User Name")

        expect(user.login).toBe('newLogin');
        expect(user.name).toBe('New User Name');
    });

    it('EXO-2.2.3: should call $location.url() when doLogin()', function() {
        $scope.doLogin("newLogin", "New User Name")
        expect($location.url()).toEqual('/');
    });
});

