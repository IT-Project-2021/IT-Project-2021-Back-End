const Meeting = require('./meeting.model');
const userHelpers = require('../helpers/userHelpers');
const httpStatus = require('http-status');

/**
 * Load meeting and append to req.
 */
function load(req, res, next, id) {
  Meeting.get(id)
    .then((meeting) => {
      req.meeting = meeting; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get meeting
 * @returns {Meeting}
 */
function get(req, res) {
  userHelpers.getUserID(req.user)
    .then((response) => {
      const userID = response;
      if (req.meeting.user && (userID.toString() === req.meeting.user.toString())) {
        return res.json(req.meeting);
      }
      // user ID mismatch
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'ID Mismatch'
      });
    });
}

/**
 * Create new meeting
 * @property {string} req.body.user - The user of the meeting.
 * @property {string} req.body.title - The name of the meeting.
 * @property {string} req.body.details - The details of the meeting.
 * @property {date} req.body.date - The date of the meeting.
 * @property {string} req.body.location - The location of the meeting.
 * @property {string[]} req.body.participants - The participants of the meeting.
 * @property {string[]} req.body.agenda - The agenda of the meeting.
 * @property {object[]} req.body.alerts - The alerts of the meeting.
 */
function create(req, res, next) {
  userHelpers.getUserID(req.user)
    .then((response) => {
      const userID = response;
      const meeting = new Meeting({
        user: userID,
        title: req.body.title,
        details: req.body.details,
        date: req.body.date,
        location: req.body.location,
        participants: req.body.participants,
        agenda: req.body.agenda,
        alerts: req.body.alerts,
      });
      meeting.save()
        .then(savedMeeting => res.json(savedMeeting))
        .catch(e => next(e));
    })
    .catch(() => {
      // this error occurs if there was some problem with user authentication
      // (e.g. missing token, bad token)
      res.status(httpStatus.UNAUTHORIZED);
    });
}

/**
 * Update existing meeting
 * @property {string} req.body.user - The user of the meeting.
 * @property {string} req.body.title - The name of the meeting.
 * @property {string} req.body.details - The details of the meeting.
 * @property {Date} req.body.date - The date of the meeting.
 * @property {string} req.body.location - The location of the meeting.
 * @property {string[]} req.body.participants - The participants of the meeting.
 * @property {string[]} req.body.agenda - The agenda of the meeting.
 * @property {object[]} req.body.alerts - The alerts of the meeting.
 * @returns {Meeting}
 */
function update(req, res, next) {
  const meeting = req.meeting;
  meeting.user = req.body.user || meeting.user;
  meeting.title = req.body.title || meeting.title;
  meeting.details = req.body.details || meeting.details;
  meeting.date = req.body.date || meeting.date;
  meeting.location = req.body.location || meeting.location;
  meeting.participants = req.body.participants || meeting.participants;
  meeting.agenda = req.body.agenda || meeting.agenda;
  meeting.alerts = req.body.alerts || meeting.alerts;

  meeting.save()
    .then(savedMeeting => res.json(savedMeeting))
    .catch(e => next(e));
}

/**
 * Get meeting list.
 * @returns {Meeting[]}
 */
function list(req, res, next) {
  // Unauthorised if no token in the request
  if (!req.user) {
    res.status(httpStatus.UNAUTHORIZED);
  }

  // Get the user ID from the token saved
  userHelpers.getUserID(req.user)
    .then((userID) => {
      Meeting.list()
      .then((meetings) => {
        res.json(meetings
          .filter(meeting => meeting.user && (meeting.user.toString() === userID.toString()))
        );
      });
    })
    .catch(e => next(e));
}

/**
 * Delete meeting.
 * @returns {Meeting}
 */
function remove(req, res, next) {
  const meeting = req.meeting;
  meeting.remove()
    .then(deletedMeeting => res.json(deletedMeeting))
    .catch(e => next(e));
}

/**
 * Get meetings where a specified participant is present
 */
function getByParticipantId(req, res, next) {
  const getMeetingParticipants = meeting => meeting.participants
    .map(participant => participant._id.toString());
  const personID = req.params.personId;
  // Returns true if the person is a participant in the meeting, and false otherwise
  const isParticipant = (meeting, person) => {
    if (getMeetingParticipants(meeting).includes(person)) {
      return true;
    }
    return false;
  };
  // Ensure the participant "belongs" to the user
  userHelpers
    .participantBelongsTo(req.user, personID)
    .then((belongs) => {
      if (belongs === true) {
        Meeting.list()
        .then(meetings => res
          .json(meetings.filter(meeting => isParticipant(meeting, personID.toString())))
        )
        .catch(e => next(e));
      } else {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'Unauthorized' });
      }
    });
}

module.exports = { load, get, create, update, list, remove, getByParticipantId };
