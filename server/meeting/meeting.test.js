const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Meeting APIs', () => {
  let meeting = {
    user: '615a606d1689023f75b4320d',
    title: 'Meeting Name',
    details: 'Details',
    date: '2020-05-15T06:35:45.000Z',
    location: 'Melbourne',
    participants: ['6123785eec27a723da40feae', '6123827fd394f951583f0578'],
    agenda: ['Inception Sprint', 'Sprint 1'],
    alerts: [{ alertTime: '2020-05-15T06:35:45.000Z', alertSetting: 'email' }]
  };

  // this is the token for the user johndoe1@gmail.com - userID above
  const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2UxQGdtYWlsLmNvbSIsImlhdCI6MTYzNDcxOTQxNn0.udmTskz0y2d6cpnoI6TDQ-tTRj9U8QWRynFsRZppijw';

  describe('# POST /api/meetings', () => {
    it('should create a new meeting', (done) => {
      request(app)
        .post('/api/meetings')
        .set('Authorization', validToken)
        .send(meeting)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(meeting.user);
          expect(res.body.title).to.equal(meeting.title);
          expect(res.body.details).to.equal(meeting.details);
          expect(res.body.date).to.equal(meeting.date);
          expect(res.body.location).to.equal(meeting.location);
          expect(res.body.participants).to.deep.equal(meeting.participants);
          expect(res.body.agenda).to.deep.equal(meeting.agenda);
          expect(res.body.alerts.alertTime).to.equal(meeting.alerts.alertTime);
          expect(res.body.alerts.alertSetting).to.equal(meeting.alerts.alertSetting);
          meeting = res.body;
          done();
        })
        .catch(done);
    }).timeout(15000);

    it('should fail to create a new meeting due to missing authorisation', (done) => {
      request(app)
        .post('/api/meetings')
        .send(meeting)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    }).timeout(15000);
  });

  describe('# GET /api/meetings/:meetingId', () => {
    it('should get meeting details', (done) => {
      request(app)
        .get(`/api/meetings/${meeting._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(meeting.user);
          expect(res.body.title).to.equal(meeting.title);
          expect(res.body.details).to.equal(meeting.details);
          expect(res.body.date).to.equal(meeting.date);
          expect(res.body.location).to.equal(meeting.location);
          expect(res.body.participants).to.deep.equal(meeting.participants);
          expect(res.body.agenda).to.deep.equal(meeting.agenda);
          expect(res.body.alerts.alertTime).to.equal(meeting.alerts.alertTime);
          expect(res.body.alerts.alertSetting).to.equal(meeting.alerts.alertSetting);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when meeting does not exist', (done) => {
      request(app)
        .get('/api/meetings/888888888888888888888888')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    }).timeout(3000);
  });

  describe('# PUT /api/:meetingId', () => {
    it('should update meeting details', (done) => {
      meeting.details = 'Yeet';
      request(app)
        .put(`/api/meetings/${meeting._id}`)
        .send(meeting)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(meeting.user);
          expect(res.body.title).to.equal(meeting.title);
          expect(res.body.details).to.equal('Yeet');
          expect(res.body.date).to.equal(meeting.date);
          expect(res.body.location).to.equal(meeting.location);
          expect(res.body.participants).to.deep.equal(meeting.participants);
          expect(res.body.agenda).to.deep.equal(meeting.agenda);
          expect(res.body.alerts.alertTime).to.equal(meeting.alerts.alertTime);
          expect(res.body.alerts.alertSetting).to.equal(meeting.alerts.alertSetting);
          done();
        })
        .catch(done);
    }).timeout(3000);
  });

  describe('# GET /api/meetings/', () => {
    it('should get all meetings', (done) => {
      request(app)
        .get('/api/meetings')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/meetings/:meetingId', () => {
    it('should delete meeting', (done) => {
      request(app)
        .delete(`/api/meetings/${meeting._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(meeting.user);
          expect(res.body.title).to.equal(meeting.title);
          expect(res.body.details).to.equal('Yeet');
          expect(res.body.date).to.equal(meeting.date);
          expect(res.body.location).to.equal(meeting.location);
          expect(res.body.participants).to.deep.equal(meeting.participants);
          expect(res.body.agenda).to.deep.equal(meeting.agenda);
          expect(res.body.alerts.alertTime).to.equal(meeting.alerts.alertTime);
          expect(res.body.alerts.alertSetting).to.equal(meeting.alerts.alertSetting);
          done();
        });
      // .catch
    }).timeout(3000);
  });
});
