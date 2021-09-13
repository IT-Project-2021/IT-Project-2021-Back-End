'use strict';


/**
 * Delete meetings
 *
 * meetingId String 
 * returns Meeting
 **/
exports.deleteMeetingId = function(meetingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "a;slkdnv923r23",
  "details" : "Details",
  "date" : "2020-05-15T06:35:45Z",
  "location" : "Melbourne",
  "participants" : [ "Daniel", "John" ],
  "agenda" : [ "Inception Sprint", "Sprint 1" ],
  "alerts" : [ {
    "alertTime" : "2020-05-15T06:35:45Z",
    "alertSettings" : "email"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get meeting
 *
 * meetingId String 
 * returns Meeting
 **/
exports.getMeetingId = function(meetingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "a;slkdnv923r23",
  "details" : "Details",
  "date" : "2020-05-15T06:35:45Z",
  "location" : "Melbourne",
  "participants" : [ "Daniel", "John" ],
  "agenda" : [ "Inception Sprint", "Sprint 1" ],
  "alerts" : [ {
    "alertTime" : "2020-05-15T06:35:45Z",
    "alertSettings" : "email"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get list of meetings
 *
 * returns Meeting
 **/
exports.getMeetings = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "a;slkdnv923r23",
  "details" : "Details",
  "date" : "2020-05-15T06:35:45Z",
  "location" : "Melbourne",
  "participants" : [ "Daniel", "John" ],
  "agenda" : [ "Inception Sprint", "Sprint 1" ],
  "alerts" : [ {
    "alertTime" : "2020-05-15T06:35:45Z",
    "alertSettings" : "email"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create new meeting
 *
 * body Meeting 
 * returns Meeting
 **/
exports.postMeeting = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "a;slkdnv923r23",
  "details" : "Details",
  "date" : "2020-05-15T06:35:45Z",
  "location" : "Melbourne",
  "participants" : [ "Daniel", "John" ],
  "agenda" : [ "Inception Sprint", "Sprint 1" ],
  "alerts" : [ {
    "alertTime" : "2020-05-15T06:35:45Z",
    "alertSettings" : "email"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update meeting
 *
 * body Meeting 
 * meetingId String 
 * returns Meeting
 **/
exports.putMeetingId = function(body,meetingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "_id" : "a;slkdnv923r23",
  "details" : "Details",
  "date" : "2020-05-15T06:35:45Z",
  "location" : "Melbourne",
  "participants" : [ "Daniel", "John" ],
  "agenda" : [ "Inception Sprint", "Sprint 1" ],
  "alerts" : [ {
    "alertTime" : "2020-05-15T06:35:45Z",
    "alertSettings" : "email"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

