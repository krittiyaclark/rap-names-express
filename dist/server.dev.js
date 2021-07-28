"use strict";

var express = require('express');

var app = express();

var MongoClient = require('mongodb').MongoClient;

var PORT = 2121;

require('dotenv').config(); // // Connect To DB


var db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap';
MongoClient.connect(dbConnectionStr, {
  useUnifiedTopology: true
}).then(function (client) {
  console.log("Connected to ".concat(dbName, " Database"));
  db = client.db(dbName);
}); // // Setup Server

app.set('view engine', 'ejs');
app.use(express["static"]('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); // // API - GET

app.get('/', function (request, response) {
  db.collection('rappers').find().sort({
    likes: -1
  }).toArray().then(function (data) {
    response.render('index.ejs', {
      info: data
    });
  })["catch"](function (error) {
    return console.error(error);
  });
});
app.post('/addRapper', function (request, response) {
  db.collection('rappers').insertOne({
    stageName: request.body.stageName,
    birthName: request.body.birthName,
    likes: 0
  }).then(function (result) {
    console.log('Rapper Added');
    response.redirect('/');
  })["catch"](function (error) {
    console.log(error);
  });
}); // // Setup Server

app.listen(process.env.PORT || PORT, function () {
  console.log("Server running on port ".concat(PORT));
});