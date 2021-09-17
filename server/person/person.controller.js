const Person = require('./person.model');

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
  return res.json(req.person);
}

/**
 * Create new person
 * @property {string} req.body.first_name - The first name of the person.
 * @property {string} req.body.last_name - The last name of the person.
 * @property {string} req.body.phone_num - The phone number of the person.
 * @property {string} req.body.email - The email of the person.
 * @property {string} req.body.company - The company the person is associated with
 * @property {string} req.body.position - The person's position within the company
 * @property {string} req.body.notes - Notes about the person
 */
function create(req, res, next) {
  const person = new Person({
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
}

/**
 * Update existing person
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
  const person = req.person;
  person.first_name = req.body.first_name;
  person.last_name = req.body.last_name;
  person.phone_num = req.body.phone_num;
  person.email = req.body.email;
  person.company = req.body.company;
  person.position = req.body.position;
  person.notes = req.body.notes;

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(e => next(e));
}

/**
 * Get person list.
 * @returns {Person[]}
 */
function list(req, res, next) {
  // everything works fine when this line is gone, and it doesn't
  // look like any variables are being assigned?
  // i didn't totally remove it just in case though
  // const { } = req.query;

  Person.list()
    .then(people => res.json(people))
    .catch(e => next(e));
}

/**
 * Delete person.
 * @returns {Person}
 */
function remove(req, res, next) {
  const person = req.person;
  person.remove()
    .then(deletedPerson => res.json(deletedPerson))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
