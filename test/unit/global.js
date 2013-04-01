'use strict';

beforeEach(module('bugTrackerApp'));

// Add toHaveClass matcher
beforeEach(function () {
    this.addMatchers({
        toHaveClass: function(className) {
            var error, actual = this.actual;
            this.message = function() { return error; };
            var expected = this.actual.hasClass(className);
            if (!expected) {
                error = 'Expect class "' + className + '" but has none: ' + angular.mock.dump(this.actual);
            }
            return !error;
        },
        toHaveNoClass: function(className) {
            var error;
            this.message = function() { return error; };
            var expected = this.actual.hasClass(className);
            if (expected) {
                error = 'Expect not to have class "' + className + '" but has one: ' + angular.mock.dump(this.actual);
            }
            return !error;
        }
    });
});
