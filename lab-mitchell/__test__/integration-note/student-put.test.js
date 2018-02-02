'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('#student-put.test.js', function () {
  beforeAll(() => server.start(4004, () => console.log(`listening on 4004`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valie request/respponse', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4003/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res);

      return superagent.put(':4003')

    it('should PUT a new student with name and city', () => {

    });
  });
});