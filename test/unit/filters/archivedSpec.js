'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('EXO-6.3.x: archived filter', function() {
    var archived;

    var ISSUES = [ {status: 'new', id: 1},  {status: 'archived', id: 2},  {status: 'closed', id: 3}  ]

    // fetch from injector
    beforeEach(inject(function(archivedFilter) {
        archived = archivedFilter;
    }));

    // -> use iit(...) to execute only one given test
    //    use xit(...) to disable the given test
    it('should have a archived filter defined', inject(function($filter) {
        // -> use the fallowing command to stop and debug unit test in chrome dev tools (chrome dev panel has to be opened)
        // debugger;

        expect($filter('archived')).toBeDefined();
    }));

    it('EXO-6.3.1: should return only archived issues (status == "archived")', function () {
        var filtered = archived(ISSUES, true);
        expect(filtered.length).toEqual(1);
        expect(filtered[0].id).toEqual(2);
    });

    it('EXO-6.3.1: should return all but archived issues (status != "archived")', function () {
        var filtered = archived(ISSUES, false);
        expect(filtered.length).toEqual(2);
        expect(filtered[0].id).toEqual(1);
        expect(filtered[1].id).toEqual(3);
    });

});