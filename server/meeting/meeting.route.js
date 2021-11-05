const express = require('express');
const meetingCtrl = require('./meeting.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/meetings - Get list of all meetings */
  // SECURE ROUTE
  .get(expressJwt({ secret: config.jwtSecret }), meetingCtrl.list)

  /** POST /api/meetings - Create new meeting */
  // SECURE ROUTE
  .post(expressJwt({ secret: config.jwtSecret }), meetingCtrl.create);

router.route('/:meetingId')
  /** GET /api/meetings/:meetingId - Get meeting */
  // SECURE ROUTE
  .get(expressJwt({ secret: config.jwtSecret }), meetingCtrl.get)

  /** PUT /api/meetings/:meetingId - Update meeting */
  // SECURE ROUTE
  .put(expressJwt({ secret: config.jwtSecret }), meetingCtrl.update)

  /** DELETE /api/meetings/:meetingId - Delete meeting */
  // SECURE ROUTE
  .delete(expressJwt({ secret: config.jwtSecret }), meetingCtrl.remove);

router.route('/participant/:personId')
  /** GET /api/meetings/participant/:personId - get a list of meetings with specified participant */
  // SECURE ROUTE
  .get(expressJwt({ secret: config.jwtSecret }), meetingCtrl.getByParticipantId);

/** Load meeting when API when API with meetingId route parameter is hit */
router.param('meetingId', meetingCtrl.load);

module.exports = router;
