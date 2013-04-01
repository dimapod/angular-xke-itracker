var mongojs = require('mongojs');
var async = require('async');

var db = mongojs('xke', ['tracks', 'comments', 'sequence'])

exports.getIssues = function (req, res) {
    db.tracks.find({}, {}, function (err, docs) {
        res.send(docs);
    });
};

exports.getIssueById = function (req, res) {
    var ObjectId = mongojs.ObjectId;
    db.tracks.findOne({_id: ObjectId(req.params.id)}, function (err, doc) {
        res.send(doc);
    });
};

exports.saveIssue = function (req, res) {
    var body = req.body;
    async.waterfall([
       function(callback) {
           nextId(callback);
       },
       function(err, doc, next) {
           body.businessId = doc.value.businessId;
           db.tracks.save(body, next);
       }
    ],
    function(err, success) {
        res.send(201, success);
    });
};

exports.updateIssue = function (req, res) {
    var body = req.body;
    var ObjectId = mongojs.ObjectId;

    body._id = ObjectId(req.params.id);
    console.log("updateIssue: id=" + req.params.id);
    db.tracks.update({_id: ObjectId(req.params.id)}, body, function (err, doc){
        res.send(200);
    });
};

exports.getCommentsById = function (req, res) {
    db.comments.find({ 'track.id' : req.params.id}, function (err, docs) {
        res.send(docs);
    });
};

exports.saveComment = function (req, res) {
    var body = req.body;
    console.log("saveComment: " + req.params.id + "; body=" + body.comment);
    body.track = {'ref': 'tracks', 'id' : req.params.id};
    db.comments.save(req.body, function (err, doc) {
        console.log(err);
        res.send(201, doc);
    });
};

function nextId(callback) {
    db.sequence.findAndModify({
        query: {key: 'SPX'},
        update: { $inc: { businessId: 1 } },
        upsert: true,
        new :true
    }, callback);
};
