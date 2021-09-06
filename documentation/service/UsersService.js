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
  "username" : "johndoe",
  "mobileNumber" : "01189998819991197253",
  "createdAt" : "2021-09-06T08:04:37.137Z"
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
  "username" : "johndoe",
  "mobileNumber" : "01189998819991197253",
  "createdAt" : "2021-09-06T08:04:37.137Z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get list of users
 *
 * returns User
 **/
exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "username" : "johndoe",
  "mobileNumber" : "01189998819991197253",
  "createdAt" : "2021-09-06T08:04:37.137Z"
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
 * body User  (optional)
 * returns User
 **/
exports.postUsers = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "6123778d576d702575e97590",
  "username" : "johndoe",
  "mobileNumber" : "01189998819991197253",
  "createdAt" : "2021-09-06T08:04:37.137Z"
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
  "username" : "johndoe",
  "mobileNumber" : "01189998819991197253",
  "createdAt" : "2021-09-06T08:04:37.137Z"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

