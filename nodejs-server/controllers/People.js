'use strict';

var utils = require('../utils/writer.js');
var People = require('../service/PeopleService');

module.exports.peopleGET = function peopleGET (req, res, next) {
  People.peopleGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peoplePOST = function peoplePOST (req, res, next, body) {
  People.peoplePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peoplePersonIdDELETE = function peoplePersonIdDELETE (req, res, next, personId) {
  People.peoplePersonIdDELETE(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peoplePersonIdGET = function peoplePersonIdGET (req, res, next, personId) {
  People.peoplePersonIdGET(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peoplePersonIdPUT = function peoplePersonIdPUT (req, res, next, body, personId) {
  People.peoplePersonIdPUT(body, personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
