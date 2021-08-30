'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.testGET = function testGET (req, res, next) {
  Default.testGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
