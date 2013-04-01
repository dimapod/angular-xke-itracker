'use strict';

// -> use ddescribe(...) to execute only one given test suite
//    use xdescribe(...) to disable given test suite
describe('E2E test suite', function () {

    // Navigation menu testing
    describe('EXO-1.x: menu navigation', function () {

        beforeEach(function () {
            login();
        });

        describe('EXO-1.1: navigation', function () {

            // -> use iit(...) to execute only one given test
            //    use xit(...) to disable the given test
            it('should go to /issue view', function () {
                // -> use the fallowing command to pause e2e test
                //pause();
                browser().navigateTo('/index.html#/about');

                element('#issue a').click();
                expect(browser().location().url()).toBe('/issue');
                expect(element('div.btr-panel h4:first').text()).toEqual('Issues');
            });

            it('should go to /archive view', function () {
                browser().navigateTo('/index.html#/about');
                element('#archive a').click();

                expect(browser().location().url()).toBe('/archive');
                expect(element('div.btr-panel h4:first').text()).toEqual('Archived issues');
            });

            it('should go to /about view', function () {
                browser().navigateTo('/index.html#/issue');
                element('#about a').click();

                expect(browser().location().url()).toBe('/about');
                expect(element('div.btr-panel h4:first').text()).toEqual('About');
            });

        });


        describe('EXO-1.2.2: highlight menu items', function () {
            it('should add class .active to "issues" menu item (li tag)', function () {
                browser().navigateTo('/index.html#/about');
                expect(element('#issue.active').count()).toBe(0);

                element('#issue a').click();

                // expect .active class to be set only for issue menu item
                expect(element('#issue.active').count()).toBe(1);
                expect(element('.active').count()).toBe(1);
            });

            it('should add class .active to "archive" menu item (li tag)', function () {
                browser().navigateTo('/index.html#/about');
                expect(element('#archive.active').count()).toBe(0);

                element('#archive a').click();

                // expect .active class to be set only for archive menu item
                expect(element('#archive.active').count()).toBe(1);
                expect(element('.active').count()).toBe(1);
            });

            it('should add class .active to "about" menu item (li tag)', function () {
                browser().navigateTo('/index.html#/issue');
                expect(element('#about.active').count()).toBe(0);

                element('#about a').click();

                // expect .active class to be set only for about menu item
                expect(element('#about.active').count()).toBe(1);
                expect(element('.active').count()).toBe(1);
            });
        });

        describe('EXO-1.3: default route', function () {
            it('should redirect to issue path when route is unknown', function () {
                login();
                browser().navigateTo('/index.html#/issue');

                expect(browser().location().url()).toBe('/issue');

                browser().navigateTo('#/unknown_root');
                expect(browser().location().url()).toBe('/issue');
            });
        });
    });

    // Login testing (/user view)
    describe('EXO-2.x: login user', function () {
        beforeEach(function() {
            browser().navigateTo('/index.html#/user');
        });

        it('EXO-2.1: should show login form (routes)', function () {
            expect(element('form h3:first').text()).toEqual('Identification');
        });

        it('EXO-2.4: should disable form submission button when empty', function() {
            input('login').enter('');
            input('name').enter('');

            expect(element(':button.btn-primary:disabled').count()).toEqual(1);
        });

        it('EXO-2.4: should go to /issue when successfully logged', function() {
            input('login').enter('e2eUser');
            input('name').enter('User Name');
            element(':button.btn-primary').click();

            expect(browser().location().url()).toBe('/issue');
        });

        it('EXO-2.4: should persist user information (to local storage)', function() {
            input('login').enter('e2eUser');
            input('name').enter('User Name');
            element(':button.btn-primary').click();

            // reload the page
            browser().navigateTo('/index.html#/user');

            expect(input('login').val()).toEqual('e2eUser');
            expect(input('name').val()).toEqual('User Name');
        });

    });

    // Add view testing
    describe('EXO-3.x: add view', function () {
        beforeEach(function() {
            login();
        });

        it('EXO-3.1: should show "add new issue" view form', function() {
            browser().navigateTo('/index.html#/add');

            expect(element('div.btr-panel h4').text()).toEqual('New issue');
        });

        it('should go to new issue view', function() {
            browser().navigateTo('/index.html#/issues');
            // click on "Report new issue" button
            element('#addIssue').click();

            expect(browser().location().url()).toBe('/add');
        });

        it('EXO-3.3: should have reporter field filled in', function() {
            browser().navigateTo('/index.html#/add');

            expect(input('issue.reporter').val()).toEqual('e2eUser');
        });

        it('should fail to submit when mandatory fields not filled', function() {
            browser().navigateTo('/index.html#/add');
            element('#submit').click();

            expect(browser().location().url()).toBe('/add');
        });

        it('EXO-3.3: should submit new issue', function() {
            browser().navigateTo('/index.html#/add');

            // Fill new issue fields
            var summary = 'E2E Summary ' + new Date();
            input('issue.product').enter('E2E Product');
            input('issue.version').enter('E2E Version');
            select('issue.severity').option('minor');
            input('issue.summary').enter(summary);
            input('issue.description').enter('E2E Description');
            element('#submit').click();

            expect(browser().location().url()).toBe('/issue');
            expect(element('table tbody tr:nth-child(1) td:nth-child(5)').text()).toEqual(summary)
        });
    });

    // Logout
    describe('EXO-4.x: logout', function () {
        it('EXO-4.2: should go to /user when logout', function() {
            login();

            browser().navigateTo('/index.html#/issues');
            element('.btr-login a').click();

            expect(browser().location().url()).toBe('/user');
        });

        it('EXO-4.3: should redirect to /user when not logged in', function () {
            // erase local storage user info (=> user is not logged in)
            window.localStorage['configuration'] = '{}'

            browser().navigateTo('/index.html#/issue');

            expect(browser().location().url()).toBe('/user');
        });
    });


    // Edit view testing
    describe('EXO-5.x: Edit view', function () {

        describe('EXO-5.1: Edit route', function () {
            it('should show "edit issue" view form', function() {
                browser().navigateTo('/index.html#/edit/id');

                expect(element('div.btr-panel h4').text()).toMatch('Edit issue: ');
            });
        });

        describe('Edit issue', function () {
            var summary;
            beforeEach(function() {
                login();

                // Add new issue
                browser().navigateTo('/index.html#/add');
                summary = 'E2E Edit Summary ' + new Date();
                input('issue.product').enter('E2E Edit Product');
                input('issue.version').enter('E2E Edit Version');
                select('issue.severity').option('minor');
                input('issue.summary').enter(summary);
                input('issue.description').enter('E2E Edit Description');
                element('#submit').click();

                browser().navigateTo('/index.html#/issue');
            });

            it('should have all fields filled in', function() {
                // Click on first issue in issue list
                element('table a:first').click();

                expect(input('issue.reporter').val()).toEqual('e2eUser');
                expect(input('issue.product').val()).toEqual('E2E Edit Product');
                expect(input('issue.version').val()).toEqual('E2E Edit Version');
                expect(input('issue.severity').val()).toEqual('minor');
                expect(input('issue.summary').val()).toEqual(summary);
                expect(input('issue.status').val()).toEqual('new');
                expect(input('issue.description').val()).toEqual('E2E Edit Description');
            });

            it('EXO-5.3: should edit issue (change status to confirmed)', function() {
                // Click on first issue in issue list
                element('table a:first').click();

                select('issue.status').option('confirmed');
                element('#submit').click();

                // Assert: first line in issue list has to be changed
                expect(element('table tbody tr:nth-child(1) td:nth-child(5)').text()).toEqual(summary);
                expect(element('table tbody tr:nth-child(1) td:nth-child(2)').text()).toEqual('confirmed')
            });

            // Comments
            it('EXO-5.4: should add a comment when edit issue', function() {
                // Click on first issue in issue list
                element('table a:first').click();

                // Fill comment field
                var comment = "Comment " + new Date();
                input('newComment.comment').enter(comment);
                element('#submit').click();

                // Click on first issue in issue list
                element('table a:first').click();

                // Asserts
                expect(element('.comment textarea').text()).toEqual(comment)
                expect(element('.comment b').text()).toEqual('e2eUser')
            });
        });
    });


    describe('EXO-6.x: Misc', function () {
        var summary;
        beforeEach(function() {
            login();

            // Add new issue
            browser().navigateTo('/index.html#/add');
            summary = 'E2E Misc Summary ' + new Date();
            input('issue.product').enter('E2E Misc Product');
            input('issue.version').enter('E2E Misc Version');
            select('issue.severity').option('major');
            input('issue.summary').enter(summary);
            input('issue.description').enter('E2E Misc Description');
            element('#submit').click();

            browser().navigateTo('/index.html#/issue');
        });

        // Resolved issues
        it('EXO-6.1: should add class .resolved to resolved issue', function() {
            // Click on first issue in issue list
            element('table a:first').click();

            // Change status to Resolved
            select('issue.status').option('resolved');
            element('#submit').click();

            // Assert: first line in issue list has to have class .resolved
            expect(element('table tbody tr:nth-child(1).resolved').count()).toEqual(1);
        });

        // Severity
        it('EXO-6.2: should add .minor severity class', function() {
            // Assert: first line in issue list has to have class .minor (because created issue is minor)
            expect(element('table tbody tr:nth-child(1) td:nth-child(7).major').count()).toEqual(1);
        });

        // Archived issues
        it('EXO-6.3.2: should filter archived issues in /issue list', function() {
            // Add another issue (n2)
            browser().navigateTo('/index.html#/add');
            var summary2 = 'E2E Archive Summary ' + new Date();
            input('issue.product').enter('E2E Archive Product');
            input('issue.version').enter('E2E Archive Version');
            select('issue.severity').option('minor');
            input('issue.summary').enter(summary2);
            input('issue.description').enter('E2E Archive Description');
            element('#submit').click();

            // Click on first issue in issue list
            element('table a:first').click();

            // Change status to Archived
            select('issue.status').option('archived');
            element('#submit').click();

            // Assert: issue 2 has not to be in list
            expect(element('table tbody tr:nth-child(1) td:nth-child(5)').text()).toEqual(summary);

            // Go to archived list
            browser().navigateTo('/index.html#/archive');

            // Assert: issue n2 has has to be in archived list
            expect(element('table tbody tr:nth-child(1) td:nth-child(5)').text()).toEqual(summary2);
        });
    });

    function login() {
        window.localStorage['configuration'] = '{"login":"e2eUser"}'
    }

});
