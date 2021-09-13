const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const personRoutes = require('./server/person/person.route');
const meetingRoutes = require('./server/meeting/meeting.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount person routes at /people
router.use('/people', personRoutes)

// mounter meeting routes at /meetings
router.use('/meetings', meetingRoutes)

module.exports = router;
