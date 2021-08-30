'use strict';


/**
 * Get a list of all people
 *
 * returns Person
 **/
exports.peopleGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create new person
 *
 * body Person 
 * returns Person
 **/
exports.peoplePOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete person
 *
 * personId String 
 * returns Person
 **/
exports.peoplePersonIdDELETE = function(personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get person
 *
 * personId String 
 * returns Person
 **/
exports.peoplePersonIdGET = function(personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update person
 *
 * body Person 
 * personId String 
 * returns Person
 **/
exports.peoplePersonIdPUT = function(body,personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

