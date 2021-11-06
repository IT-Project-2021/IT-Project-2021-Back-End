'use strict';


/**
 * Delete user
 *
 * userId String 
 * returns User
 **/
exports.deleteUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "first_name" : "John",
  "last_name" : "Doe",
  "email" : "johndoe@gmail.com",
  "password_hash" : "$2a$10$BQtK9eybr0mbPC2R4cxeaeVx7WK.Z0G1TjI0wKqBGzfnIE6Wa.Dxu",
  "contacts" : [ "6123785eec27a723da40feae", "6123827fd394f951583f0578" ],
  "meetings" : [ "613efb07bcfb116d50665acb", "613efb689b7c8e6ef8fdc4e6" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get user
 *
 * userId String 
 * returns User
 **/
exports.getUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "first_name" : "John",
  "last_name" : "Doe",
  "email" : "johndoe@gmail.com",
  "password_hash" : "$2a$10$BQtK9eybr0mbPC2R4cxeaeVx7WK.Z0G1TjI0wKqBGzfnIE6Wa.Dxu",
  "contacts" : [ "6123785eec27a723da40feae", "6123827fd394f951583f0578" ],
  "meetings" : [ "613efb07bcfb116d50665acb", "613efb689b7c8e6ef8fdc4e6" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get user from just token
 *
 * returns User
 **/
exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "first_name" : "John",
  "last_name" : "Doe",
  "email" : "johndoe@gmail.com",
  "password_hash" : "$2a$10$BQtK9eybr0mbPC2R4cxeaeVx7WK.Z0G1TjI0wKqBGzfnIE6Wa.Dxu",
  "contacts" : [ "6123785eec27a723da40feae", "6123827fd394f951583f0578" ],
  "meetings" : [ "613efb07bcfb116d50665acb", "613efb689b7c8e6ef8fdc4e6" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create new user
 *
 * body Users_body  (optional)
 * returns User
 **/
exports.postUsers = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "first_name" : "John",
  "last_name" : "Doe",
  "email" : "johndoe@gmail.com",
  "password_hash" : "$2a$10$BQtK9eybr0mbPC2R4cxeaeVx7WK.Z0G1TjI0wKqBGzfnIE6Wa.Dxu",
  "contacts" : [ "6123785eec27a723da40feae", "6123827fd394f951583f0578" ],
  "meetings" : [ "613efb07bcfb116d50665acb", "613efb689b7c8e6ef8fdc4e6" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update user
 *
 * body User  (optional)
 * userId String 
 * returns User
 **/
exports.putUserId = function(body,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "first_name" : "John",
  "last_name" : "Doe",
  "email" : "johndoe@gmail.com",
  "password_hash" : "$2a$10$BQtK9eybr0mbPC2R4cxeaeVx7WK.Z0G1TjI0wKqBGzfnIE6Wa.Dxu",
  "contacts" : [ "6123785eec27a723da40feae", "6123827fd394f951583f0578" ],
  "meetings" : [ "613efb07bcfb116d50665acb", "613efb689b7c8e6ef8fdc4e6" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

