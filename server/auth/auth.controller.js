const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const bcrypt = require('bcryptjs');
const User = require('../user//user.model');
const httpStatus = require('http-status');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      errorMessage: 'User with that email not found.',
    });
  }

  const passCompare = await bcrypt.compare(
    req.body.password,
    user.password_hash
  );
  if (!passCompare) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      errorMessage: 'Incorrect password.'
    });
  }

  const token = jwt.sign({
    email: user.email
  }, config.jwtSecret);
  return res.json({
    token,
    email: user.email
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
