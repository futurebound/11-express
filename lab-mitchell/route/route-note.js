'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser');
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {

  //no need for /api/v1/note since that's been established elsewhere
  // BELOW LINE SAYS "when a request hits this enpoint, before you run our callback, pass to the bodyParser middlware"
  router.post('/note', bodyParser, (req, res) => { //now getting into our endpoint and callback
    //post request so how do we get body of data or post request? BODY PARSER AYAYYAYAY
    //gotta create note, and note constructor returns promise
    //after creating note, handed off to storage module SO we have to require in storage module above
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note)) //return value of storage.create is JSON
      //note schema has lower case n in note, unlike last week where it was Note, b/c the directory is named note in data directory not Note
      .then(json => res.status(201).send(json))
      .catch(err => errorHandler(err, res));
  });

  //don't have to worry about distinguishing whether fetchOne or fetchAll, and allows for using /:id (parameterized routes) in express and just use two different .get routes instead
  router.get('/note/:_id', (req, res) => {
    //whatever is :_id is added as a params on the request object such that req.params._id
    //and if added /note/:_id/something/:cat_id, both _id and cat_id would be params on req
    //no longer making GET request with querystring
    storage.fetchOne('note', req.params._id) //querystring would be req.query._id
      .then(buffer => buffer.toString()) //returns a stringified version of buffer, and that in form of key:value pairs which we know is JSON form, so we can JSON parse to get those separated in following line
      .then(json => JSON.parse(json)) //parses then reparses SO WE CAN SEND CORRECT HEADER WITH IT
      .then(note => res.status(200).json(note)) //parse it out of JSON then flip it back in reponse GO BACK TO VID FOR EXPLANATION
      .catch(err => errorHandler(err, res));
  });

  // router.get('/note/:_id', (req, res) => {
  //   storage.fetchAll('note')
  //     .then()
  // });

  // router.put();

  // router.delete();
};