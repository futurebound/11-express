'use strict';

const uuid = require('uuid/v4');

module.exports = function(title, content) {
  return new Promise((resolve, reject) => {
    if(!title || !content) return reject(new Error('Cannot create Note. Title and Content required.'));
    this._id = uuid();
    this.title = title;
    this.content = content;

    return resolve(this); //resolves new object, meaning .then() will have access to the object created
  })
}