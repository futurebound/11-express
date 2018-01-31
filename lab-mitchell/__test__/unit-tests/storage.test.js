'use strict';

const server = require('../../lib/server');
require('jest');

describe('#storage.test.js', function () {
  beforeAll(() => server.start(3002, () => console.log(`listening on 3002`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('')

});