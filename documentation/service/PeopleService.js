'use strict';


/**
 * Delete person
 *
 * personId String 
 * returns Person
 **/
exports.deletePersonId = function(personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123785eec27a723da40feae",
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com",
  "company" : "Company Inc.",
  "position" : "Developer",
  "notes" : "A very real man.  "
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get list of people
 *
 * returns Person
 **/
exports.getPeople = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123785eec27a723da40feae",
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com",
  "company" : "Company Inc.",
  "position" : "Developer",
  "notes" : "A very real man.  "
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
exports.getPersonId = function(personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123785eec27a723da40feae",
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com",
  "company" : "Company Inc.",
  "position" : "Developer",
  "notes" : "A very real man.  "
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
exports.postPeople = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123785eec27a723da40feae",
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com",
  "company" : "Company Inc.",
  "position" : "Developer",
  "notes" : "A very real man.  "
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
exports.putPersonId = function(body,personId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123785eec27a723da40feae",
  "first_name" : "John",
  "last_name" : "Doe",
  "phone_num" : "01189998819991197253",
  "email" : "johndoe@gmail.com",
  "company" : "Company Inc.",
  "position" : "Developer",
  "notes" : "A very real man.  "
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

