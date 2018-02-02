'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('#student-delete.test.js', function () {
  beforeAll(() => server.start(4001, () => console.log(`listening on 4001`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valie request/respponse', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4003/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res);
    });

    it('should DELETE a student with ID', () => {
      (this.testStudent._id)
    });
  });

});