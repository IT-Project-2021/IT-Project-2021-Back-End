const User = require('./user.model');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.first_name - The first_name of user.
 * @property {string} req.body.last_name - The last_name of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password_hash - The password_hash of user.
 * @property {string[]} req.body.contacts - The contacts of user.
 * @property {string[]} req.body.meetings - The meetings of user.
 * @returns {User}
 */
async function create(req, res, next) {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(httpStatus.BAD_REQUEST).json({
      errorMessage: 'Email already in use.',
    });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_hash: passwordHash,
    contacts: req.body.contacts,
    meetings: req.body.meetings
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.first_name - The first_name of user.
 * @property {string} req.body.last_name - The last_name of user.
 * @property {string} req.body.email - The email of user.
 * @property {password_hash} req.body.password_hash - The password_hash of user.
 * @property {string[]} req.body.contacts - The contacts of user.
 * @property {string[]} req.body.meetings - The meetings of user.
 * @returns {User}
 */
async function update(req, res, next) {
  const user = req.user;
  if (req.body.password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    user.passwordHash = passwordHash;
  }

  user.first_name = req.body.first_name || user.first_name;
  user.last_name = req.body.last_name || user.last_name;
  user.email = req.body.email || user.email;
  user.contacts = req.body.contacts || user.contacts;
  user.meetings = req.body.meetings || user.meetings;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @returns {User[]}
 */
function list(req, res, next) {
  User.list()
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
