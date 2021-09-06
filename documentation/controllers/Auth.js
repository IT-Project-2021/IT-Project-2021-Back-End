'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');

module.exports.getRandomNumber = function getRandomNumber (req, res, next) {
  Auth.getRandomNumber()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postLogin = function postLogin (req, res, next, body) {
  Auth.postLogin(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
