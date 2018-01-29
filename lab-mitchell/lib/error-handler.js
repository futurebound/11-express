'use strict';

//going to require this into routes

module.exports = function(err, res) { //error happened elsewhere, parse out error, handle response, and kick it back
  let msg = err.message.toLowerCase(); //force any error message to lowercase so can validate that string


  //rather than parsing out msg which we define elsewhere, could just take status code and attach it as new property to error objct as opposed to having to create new swtich statement cases for each error type below
  switch(true) { //setting to true so it will run every time
  //generates response up one layer in REQ/RES cycle
  case msg.includes('validation error'): return res.status(400).send(`${err.name}: ${err.message}`);
  case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`);
  default: return res.status(500).send(`${err.name}: ${err.message}`); //means that something happened bad on server other than not found or bad request, hardware/software issue could not control such as a server/website being offline that was being used outside of the application
  }
};