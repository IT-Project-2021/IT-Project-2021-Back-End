const Person = require('./person.model');
const userHelpers = require('../helpers/userHelpers');
const httpStatus = require('http-status');

/**
 * Load person and append to req.
 */
function load(req, res, next, id) {
  Person.get(id)
    .then((person) => {
      req.person = person; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get person
 * @returns {Person}
 */
function get(req, res) {
  // Check that the person "belongs" to logged in user
  userHelpers.getUserID(req.user)
    .then((userID) => {
      if (req.person.user && (userID.toString() === req.person.user.toString())) {
        return res.json(req.person);
      }
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'ID Mismatch' });
    });
}

/**
 * Create new person
 * @property {string} req.body.user - The user of the person.
 * @property {string} req.body.first_name - The first name of the person.
 * @property {string} req.body.last_name - The last name of the person.
 * @property {string} req.body.phone_num - The phone number of the person.
 * @property {string} req.body.email - The email of the person.
 * @property {string} req.body.company - The company the person is associated with
 * @property {string} req.body.position - The person's position within the company
 * @property {string} req.body.notes - Notes about the person
 */
function create(req, res, next) {
  userHelpers
    .getUserID(req.user)
    .then((userID) => {
      const person = new Person({
        user: userID,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_num: req.body.phone_num,
        email: req.body.email,
        company: req.body.company,
        position: req.body.position,
        notes: req.body.notes
      });
      person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(e => next(e));
    });
}

/**
 * Update existing person
 * @property {string} req.body.user - The user of the person.
 * @property {string} req.body.first_name - The first name of the person.
 * @property {string} req.body.last_name - The last name of the person.
 * @property {string} req.body.phone_num - The phone number of the person.
 * @property {string} req.body.email - The email of the person.
 * @property {string} req.body.company - The company the person is associated with
 * @property {string} req.body.position - The person's position within the company
 * @property {string} req.body.notes - Notes about the person
 * @returns {Person}
 */
function update(req, res, next) {
  userHelpers.getUserID(req.user)
    .then((userID) => {
      if (req.person.user && (userID.toString() === req.person.user.toString())) {
        const person = req.person;
        person.user = req.body.user || person.user;
        person.first_name = req.body.first_name || person.first_name;
        person.last_name = req.body.last_name || person.last_name;
        person.phone_num = req.body.phone_num || person.phone_num;
        person.email = req.body.email || person.email;
        person.company = req.body.company || person.company;
        person.position = req.body.position || person.position;
        person.notes = req.body.notes || person.notes;

        person.save()
          .then(savedPerson => res.json(savedPerson))
          .catch(e => next(e));
      } else {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'ID Mismatch' });
      }
    });
}

/**
 * Get person list.
 * @returns {Person[]}
 */
function list(req, res, next) {
  userHelpers
    .getUserID(req.user)
    .then((userID) => {
      Person.list()
        .then((people) => {
          res.json(people
            .filter(person => person.user && (person.user.toString() === userID.toString()))
          );
        });
    })
    .catch(e => next(e));
}

/**
 * Delete person.
 * @returns {Person}
 */
function remove(req, res, next) {
  userHelpers.getUserID(req.user)
    .then((userID) => {
      if (req.person.user && (userID.toString() === req.person.user.toString())) {
        const person = req.person;
        person.remove()
          .then(deletedPerson => res.json(deletedPerson))
          .catch(e => next(e));
      } else {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: 'ID Mismatch' });
      }
    });
}

module.exports = { load, get, create, update, list, remove };
