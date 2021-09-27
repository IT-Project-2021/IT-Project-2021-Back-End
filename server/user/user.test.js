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

describe('## User APIs', () => {
  let user = {
    first_name: 'John',
    last_name: 'Doe',
    phone_num: '01189998819991197253',
    email: 'johndoe@gmail.com',
    password_hash: 'hunter2',
    contacts: ['6123785eec27a723da40feae', '6123827fd394f951583f0578'],
    meetings: ['613efb07bcfb116d50665acb', '613efb689b7c8e6ef8fdc4e6']
  };

  describe('# POST /api/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.first_name).to.equal(user.first_name);
          expect(res.body.last_name).to.equal(user.last_name);
          expect(res.body.phone_num).to.equal(user.phone_num);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password_hash).to.equal(user.password_hash);
          expect(res.body.contacts).to.deep.equal(user.contacts);
          expect(res.body.meetings).to.deep.equal(user.meetings);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/:userId', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.first_name).to.equal(user.first_name);
          expect(res.body.last_name).to.equal(user.last_name);
          expect(res.body.phone_num).to.equal(user.phone_num);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password_hash).to.equal(user.password_hash);
          expect(res.body.contacts).to.deep.equal(user.contacts);
          expect(res.body.meetings).to.deep.equal(user.meetings);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exist', (done) => {
      request(app)
        .get('/api/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should update user details', (done) => {
      user.first_name = 'KK';
      request(app)
        .put(`/api/users/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.first_name).to.equal('KK');
          expect(res.body.last_name).to.equal(user.last_name);
          expect(res.body.phone_num).to.equal(user.phone_num);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password_hash).to.equal(user.password_hash);
          expect(res.body.contacts).to.deep.equal(user.contacts);
          expect(res.body.meetings).to.deep.equal(user.meetings);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/:userId', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.first_name).to.equal('KK');
          expect(res.body.last_name).to.equal(user.last_name);
          expect(res.body.phone_num).to.equal(user.phone_num);
          expect(res.body.email).to.equal(user.email);
          expect(res.body.password_hash).to.equal(user.password_hash);
          expect(res.body.contacts).to.deep.equal(user.contacts);
          expect(res.body.meetings).to.deep.equal(user.meetings);
          done();
        })
        .catch(done);
    });
  });
});
