basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'app/lib/angular/angular.js',
    'app/lib/angular/angular-*.js',
    'test/lib/angular/angular-mocks.js',

    'app/js/app.js',
    'app/js/**/*.js',
    'test/unit/**/*.js'
];

preprocessors = {
    '**/*.html': 'html2js'
};

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};