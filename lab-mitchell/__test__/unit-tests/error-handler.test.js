'use strict';

const server = require('../../lib/server');
require('jest');

describe('#error-handler.js', function() {
  beforeAll(() => server.start(3001, () => console.log(`listening on 30001`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('')

});