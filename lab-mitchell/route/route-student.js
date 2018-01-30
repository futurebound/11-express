'use strict';

const Student = require('../model/student');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-student');

module.exports = function(router) {

  //no need for /api/v1/note since that's been established elsewhere
  // BELOW LINE SAYS "when a request hits this enpoint, before you run our callback, pass to the bodyParser middlware"
  router.post('/student', bodyParser, (req, res) => { //now getting into our endpoint and callback
    //post request so how do we get body of data or post request? BODY PARSER AYAYYAYAY
    //gotta create note, and note constructor returns promise
    //after creating note, handed off to storage module SO we have to require in storage module above
    new Student(req.body.name, req.body.city)
      .then(student => storage.create('student', student)) //return value of storage.create is JSON
      //note schema has lower case n in note, unlike last week where it was Note, b/c the directory is named note in data directory not Note
      .then(json => res.status(201).send(json))
      .catch(err => errorHandler(err, res));
  });

  //don't have to worry about distinguishing whether fetchOne or fetchAll, and allows for using /:id (parameterized routes) in express and just use two different .get routes instead
  router.get('/student/:_id', (req, res) => {
    //whatever is :_id is added as a params on the request object such that req.params._id
    //and if added /note/:_id/something/:cat_id, both _id and cat_id would be params on req
    //no longer making GET request with querystring
    storage.fetchOne('student', req.params._id) //querystring would be req.query._id
      .then(buffer => buffer.toString()) //returns a stringified version of buffer, and that in form of key:value pairs which we know is JSON form, so we can JSON parse to get those separated in following line
      .then(json => JSON.parse(json)) //parses then reparses SO WE CAN SEND CORRECT HEADER WITH IT
      .then(student => res.status(200).json(student)) //parse it out of JSON then flip it back in reponse GO BACK TO VID FOR EXPLANATION
      .catch(err => errorHandler(err, res));
  });

  router.get('/student', (req, res) => {
    debug('GET /api/v1/student');
    storage.fetchAll('student')
      // .then(buffer => buffer.toString()) //will throw errors since not parsing
      // .then(json => JSON.parse(json))
      .then(student => res.status(200).json(student))
      .catch(err => errorHandler(err, res));
  });

  router.put('/student/:_id', bodyParser, (req, res) => {
    debug('PUT /api/v1/student');
    return new Student(req.body.name, req.body.city)
      .then(item => {
        item = req.body._id;
        return item;
      })
      .then((item) => debug(`PUT /api/v1/student item: ${item}`))
      .then(item => storage.update('student', req.params._id, item))
      .then(student => res.status(204).json(student)) 
      .catch(err => errorHandler(err, res));
  });


  router.delete('/student/:_id', (req, res) => {
    debug('DELETE /api/v1/student');
    storage.destroy('student', req.params._id)
      // .then(buffer => buffer.toString())
      // .then(json => JSON.parse(json)) 
      .then(student => res.status(204).json(student))
      .catch(err => errorHandler(err, res));
  });
};