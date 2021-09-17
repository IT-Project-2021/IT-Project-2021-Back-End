const express = require('express');
const personCtrl = require('./person.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/people - Get list of all people */
  .get(personCtrl.list)

  /** POST /api/people - Create new person */
  .post(personCtrl.create);

router.route('/:personId')
  /** GET /api/people/:personId - Get person */
  .get(personCtrl.get)

  /** PUT /api/people/:personId - Update person */
  .put(personCtrl.update)

  /** DELETE /api/people/:personId - Delete person */
  .delete(personCtrl.remove);

/** Load person when API when API with personId route parameter is hit */
router.param('personId', personCtrl.load);

module.exports = router;
