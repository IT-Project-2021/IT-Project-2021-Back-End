const Meeting = require('./meeting.model');

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
  return res.json(req.meeting);
}

/**
 * Create new meeting
 * @property {string} req.body.details - The details of the meeting.
 * @property {date} req.body.date - The date of the meeting.
 * @property {string} req.body.location - The location of the meeting.
 * @property {string[]} req.body.participants - The participants of the meeting.
 * @property {string[]} req.body.agenda - The agenda of the meeting.
 * @property {object[]} req.body.alerts - The alerts of the meeting.
 */
function create(req, res, next) {
  const meeting = new Meeting({
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
}

/**
 * Update existing meeting
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
  meeting.details = req.body.details;
  meeting.date = req.body.date;
  meeting.location = req.body.location;
  meeting.participants = req.body.participants;
  meeting.agenda = req.body.agenda;
  meeting.alerts = req.body.alerts;

  meeting.save()
    .then(savedMeeting => res.json(savedMeeting))
    .catch(e => next(e));
}

/**
 * Get meeting list.
 * @returns {Meeting[]}
 */
function list(req, res, next) {
  Meeting.list()
    .then(meetings => res.json(meetings))
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

module.exports = { load, get, create, update, list, remove };
