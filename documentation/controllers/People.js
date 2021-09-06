'use strict';

var utils = require('../utils/writer.js');
var People = require('../service/PeopleService');

module.exports.deletePersonId = function deletePersonId (req, res, next, personId) {
  People.deletePersonId(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPeople = function getPeople (req, res, next) {
  People.getPeople()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPersonId = function getPersonId (req, res, next, personId) {
  People.getPersonId(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postPeople = function postPeople (req, res, next, body) {
  People.postPeople(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putPersonId = function putPersonId (req, res, next, body, personId) {
  People.putPersonId(body, personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
