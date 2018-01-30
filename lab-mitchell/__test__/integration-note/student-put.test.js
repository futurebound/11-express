'use strict';

const server = require('../../lib/server');
require('jest');

describe('#student-put.test.js', function () {
  beforeAll(() => server.start(4004, () => console.log(`listening on 4004`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valie request/respponse', () => {
    it('should PUT a new student with name and city', () => {

    });
  });
});