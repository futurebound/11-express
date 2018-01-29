'use strict';

//distinguishes if we are in production environment, do/dont do a thing, this way dotenv can be a dev dependency
if(process.env.NODE_ENV !== 'production') require('dotenv').config();

//if having dotenv as normal dependency
// require('dotenv').config();

const server = require('./lib/server');
server.start(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));