'use strict';

var utils = require('../utils/writer.js');
var Meetings = require('../service/MeetingsService');

module.exports.deleteMeetingId = function deleteMeetingId (req, res, next, meetingId) {
  Meetings.deleteMeetingId(meetingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMeetingId = function getMeetingId (req, res, next, meetingId) {
  Meetings.getMeetingId(meetingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMeetings = function getMeetings (req, res, next) {
  Meetings.getMeetings()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postMeeting = function postMeeting (req, res, next, body) {
  Meetings.postMeeting(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putMeetingId = function putMeetingId (req, res, next, body, meetingId) {
  Meetings.putMeetingId(body, meetingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
