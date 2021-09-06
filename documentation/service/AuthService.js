'use strict';


/**
 * Returns a random number
 *
 * returns inline_response_200_1
 **/
exports.getRandomNumber = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "num" : 26.20240705689305,
  "user" : {
    "iat" : 1630912001,
    "username" : "johndoe"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Login with username and password
 *
 * body Auth_login_body 
 * returns inline_response_200
 **/
exports.postLogin = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "token",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

