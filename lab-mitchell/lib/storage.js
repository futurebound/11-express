'use strict';


//doing some crazy shit here, changed everything from 
// if(!schema) return reject(new Error('Cannot xx record, xxx required'))
// to 
// if(!schema) return new Error('Validation error. Cannot create record, schema required);
// and instead return fs.writeFileProm with .then() .catch()


const Promise = require('bluebird'); //overwrites defaul promise
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'}); //promisifies files, gives suffix
const storage = module.exports = {};
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:storage');

const basePath = `${__dirname}/../data`;

//older version
// storage.create = function(schema, item) {
//   return new Promise((resolve, rejejct) => {
//     if(!schema) return new Error('Validation error. Cannot create record, schema required');
//     if(!item) return new Error('Validation error. Cannot create record, item required');

//     let json = JSON.stringify(item);
//     return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json) 
//       .then(() => json)
//       .catch(err => {
//         console.error('ERror occurred in #storage.create', err);
//         return err;
//       })
//   }); 
// }


let writer = (schema, id, json) =>
  fs.writeFileProm(`${basePath}/${schema}/${id}.json`, json);

let reader = (schema, path, id) => //optionally id
  fs.readFileProm(`${basePath}/${schema}/${id}.json`);

storage.create = (schema, id, item) => writer(schema, id, item);
storage.fetchOne= (schema, itemId) => reader(schema, itemId);
storage.fetchAll = (schema) => fs.readdirProm(`${basePath}/${schema}`);
storage.destroy = (schema, itemId) => fs.unlinkProm(`${basePath}/${schema}/${itemId}.json`);
storage.update = (schema, itemId, item) => writer(schema, itemId, item);


// storage.create = (schema, item) => {
//   //stringifying item that was passed in, new note, then handing off to fs.writeFile so it can be put in our data/storage directory
//   let json = JSON.stringify(item);
//   //the dankness of returning fs.writeFileProm is that all th errors we were validating directly, and now being handled by the fs.writeFileProm and the 
//   //if issue occurs on writing of file based on data that was handed to it, it will kick out errors depending on what was missing so don't need the specific 
//   //if(!schema) things
//   return fs.writeFileProm(`${basePath}/${schema}/${item._id}.json`, json) //implies gotta stringify json
//     .then(() => json); //once that done would like to return the JSON out of this 
//   // .catch removed so that it passes the error and is handled in the error-handler module .catch()'s instead
//   // .catch(err => {
//   //   console.error('ERror occurred in #storage.create', err);
//   //   return err;
//   // });
// };

// storage.fetchOne = (schema, itemId) => {
//   debug(`fetchOne itemId: ${itemId}`);
//   return fs.readFileProm(`${basePath}/${schema}/${itemId}.json`); //will return buffer, implication that buffer will be handled elsewhere
//   //if schema or itemId does not match for the record, will error out and error will be caught elsewhere (error-handler.js)
// };

// storage.fetchAll = (schema) => {
//   debug(`fetchAll schema: ${schema}`);
//   return fs.readdirProm(`${basePath}/${schema}`); //readdirProm b/c you're getting everything in the directory instead of a specific file
// };

// storage.update = (schema, itemId, item) => {
//   return fs.writeFileProm(`${basePath}/${schema}/${itemId}.json`, item)
// };

// storage.update = (schema, itemId, item) => {
//   debug(`update item: ${item}`);
//   // let fileToUpdate= {"_id": itemId, "name": body.name, "city": body.city} //possible way?
//   let json = JSON.stringify(item);
//   return fs.readFileProm(`${basePath}/${schema}/${itemId}.json`)
//     .then(() => {
//       fs.writeFileProm(`${basePath}/${schema}/${itemId}.json`, json);
//     })
//     .catch(err => errorHandler(err, res));
// };

// // //storage.destroy just to differentiate from the .delete HTTP method
// storage.destroy = function(schema, itemId) {
//   debug(`destroy itemId: ${itemId}`);
//   return fs.unlinkProm(`${basePath}/${schema}/${itemId}.json`);
// };