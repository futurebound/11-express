'use strict';

const server = require('../../lib/server');
require('jest');

describe('#student-delete.test.js', function () {
  beforeAll(() => server.start(4001, () => console.log(`listening on 4001`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valie request/respponse', () => {
    it('should DELETE a student with ID', () => {

    });
  });

});