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
  "last_name" : "last_name",
  "phone_num" : "phone_num",
  "first_name" : "first_name",
  "email" : "email"
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
 * person Person 
 * returns Person
 **/
exports.peoplePOST = function(person) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "last_name" : "last_name",
  "phone_num" : "phone_num",
  "first_name" : "first_name",
  "email" : "email"
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
  "last_name" : "last_name",
  "phone_num" : "phone_num",
  "first_name" : "first_name",
  "email" : "email"
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
  "last_name" : "last_name",
  "phone_num" : "phone_num",
  "first_name" : "first_name",
  "email" : "email"
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
 * personId String 
 * person Person 
 * returns Person
 **/
exports.peoplePersonIdPUT = function(personId,person) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "last_name" : "last_name",
  "phone_num" : "phone_num",
  "first_name" : "first_name",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

