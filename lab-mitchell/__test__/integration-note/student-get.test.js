'use strict';

const server = require('../../lib/server');
require('jest');

describe('#error-handler.js', function () {
  beforeAll(() => server.start(4002, () => console.log(`listening on 4002`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valie request/respponse', () => {
    it('should GET a student with name and city from ID', () => {

    });
  });

});