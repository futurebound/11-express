'use strict';


//doing some crazy shit here, changed everything from 
// if(!schema) return reject(new Error('Cannot xx record, xxx required'))
// to 
// if(!schema) return new Error('Validation error. Cannot create record, schema required);
// and instead return fs.writeFileProm with .then() .catch()


const Promise = require('bluebird'); //overwrites defaul promise
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'}); //promisifies files, gives suffix
const storage = module.exports = {};

storage.create = (schema, item) => {
  //stringifying item that was passed in, new note, then handing off to fs.writeFile so it can be put in our data/storage directory
  let json = JSON.stringify(item);
  //the dankness of returning fs.writeFileProm is that all th errors we were validating directly, and now being handled by the fs.writeFileProm and the 
  //if issue occurs on writing of file based on data that was handed to it, it will kick out errors depending on what was missing so don't need the specific 
  //if(!schema) things
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json) //implies gotta stringify json
    .then(() => json); //once that done would like to return the JSON out of this 
  // .catch removed so that it passes the error and is handled in the error-handler module .catch()'s instead
  // .catch(err => {
  //   console.error('ERror occurred in #storage.create', err);
  //   return err;
  // });
};

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

storage.fetchOne = (schema, itemId) => {
  return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`); //will return buffer, implication that buffer will be handled elsewhere
  //if schema or itemId does not match for the record, will error out and error will be caught elsewhere (error-handler.js)
};

storage.fetchAll = (schema) => {
  return fs.readdirProm(`${__dirname}/../data/${schema}`); //readdirProm b/c you're getting everything in the directory instead of a specific file
};

storage.update = (schema, itemId, item) => {
  // let fileToUpdate= {"_id": itemId, "name": body.name, "city": body.city}
  let fileToUpdate = fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);
  let json = JSON.stringify(fileToUpdate);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json);
  // .then(() => item)
};

// //storage.destroy just to differentiate from the .delete HTTP method
storage.destroy = function(schema, itemId) {
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};