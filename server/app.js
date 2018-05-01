const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

MongoClient.connect('mongodb://localhost:27017/checkson', (err, db) => {

  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully connected on port 27017.');
  }

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(express.static('public'));
  app.use(express.static('views/dist'));
  // app.use(bodyParser.urlencoded({ extended: false }));
  routes(app, db);

  app.listen(8888, () => {
    console.log('Server is running at port 8888...')
  })
});