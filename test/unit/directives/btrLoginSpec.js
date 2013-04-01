'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('EXO-4.x: btrLogin directive', function () {
    var user, element, compile, rootScope;

    beforeEach(function() {
        module(function ($provide) {
            user = {};
            $provide.value('user', user);
        })

        inject(function ($compile, $rootScope) {
            compile = $compile;
            rootScope = $rootScope;

            element = $compile('<btr-login></btr-login>')($rootScope);
        })
    });

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it("EXO-4.1: should display user's login", function() {
        user.login = "firstUser";
        rootScope.$apply();

        expect(element.text()).toBe("firstUser | Logout")

        user.login = "changedUser";
        rootScope.$apply();

        expect(element.text()).toBe("changedUser | Logout")
    });

    it("EXO-4.1: should display a link to logout", function() {
        var anchor = element.find('a');

        expect(anchor.attr('href')).toBe('#/user');
        expect(anchor.text()).toBe('Logout');
    });

});
