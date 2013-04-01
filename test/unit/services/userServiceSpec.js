'use strict';

// -> use iit(...) to execute only one given test
//    use xit(...) to disable the given test
describe('EXO-2.x: userService', function() {
    var user, localStorage, $rootScope;

    beforeEach(module(function($provide) {
        // Local storage mock
        localStorage = {
            configuration: '{"login":"init-login","name":"Init User Name"}'
        };

        $provide.value('localStorage', localStorage);
    }));

    beforeEach(inject(function(_user_, _$rootScope_) {
        user = _user_;
        $rootScope = _$rootScope_;
    }));

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('should load initial value from localStorage', function() {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;
        expect(user.login).toBe('init-login');
        expect(user.name).toBe('Init User Name');
    });

    it('EXO-2.3: should update any change to localStorage', function() {
        $rootScope.$apply(function() {
            user.login = 'asmith';
            user.name = 'Adam Smith';
        });

        expect(localStorage.configuration).toBe('{"login":"asmith","name":"Adam Smith"}');
    });

});