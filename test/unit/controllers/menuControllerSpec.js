'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('EXO-1.x: menuController', function(){
    var $scope;

    beforeEach(function() {
        // $location service mock
        var $location = {
            path: function() { return "/path" }
        }

        module(function($provide) {
            $provide.value('$location', $location);
        });

        // fetch from injector
        inject(function($injector, $controller, $rootScope) {
            $controller('menuCtrl', {$scope: $scope = $rootScope.$new()});
        });
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('should have routeIs() method defined', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;

        expect($scope.routeIs).toBeDefined();
    });

    // (fix it in menuController.js)
    it('EXO-1.2.1: should verify actual path', function() {
        expect($scope.routeIs('/path')).toBeTruthy();
        expect($scope.routeIs('/strange')).toBeFalsy();
    });

});

