
/**
 * Module dependencies.
 */

var express = require('express')
  , track = require('./routes/track')
  , path = require('path')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/../app')));

  // only for running e2e tests
  app.use('/test/', express.static(path.join(__dirname, '/../test')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/issue', track.getIssues);
app.get('/issue/:id', track.getIssueById);
app.post('/issue', track.saveIssue);
app.post('/issue/:id', track.updateIssue);

app.get('/issue/:id/comment', track.getCommentsById);
app.post('/issue/:id/comment', track.saveComment);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
