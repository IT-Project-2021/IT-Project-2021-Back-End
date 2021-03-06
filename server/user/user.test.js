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
  const newUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'hunter2',
    contacts: ['6123785eec27a723da40feae', '6123827fd394f951583f0578'],
    meetings: ['613efb07bcfb116d50665acb', '613efb689b7c8e6ef8fdc4e6']
  };
  let user;

  const newLoginDetails = {
    email: 'johndoe@gmail.com',
    password: 'hunter2'
  };
  let newToken;


  describe('# POST /api/users', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.first_name).to.equal(newUser.first_name);
          expect(res.body.last_name).to.equal(newUser.last_name);
          expect(res.body.email).to.equal(newUser.email);
          expect(res.body.contacts).to.deep.equal(newUser.contacts);
          expect(res.body.meetings).to.deep.equal(newUser.meetings);
          user = res.body;
          done();
        })
        .catch(done);
    })
    .timeout(4000);

    it('should report error with message - Email already in use', (done) => {
      request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.errorMessage).to.equal('Email already in use.');
          done();
        })
        .catch(done);
    });

    it('should report error with message - Email already in use', (done) => {
      request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.errorMessage).to.equal('Email already in use.');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/', () => {
    it('should get user details', (done) => {
      // Setup by requesting token of the new user
      request(app)
      .post('/api/auth/login')
      .send(newLoginDetails)
      .then((res) => {
        newToken = `Bearer ${res.body.token}`;
        // Once token is retrieved, try and get user details
        request(app)
          .get('/api/users')
          .set('Authorization', newToken)
          .expect(httpStatus.OK)
          .then((response) => {
            expect(response.body.first_name).to.equal(user.first_name);
            expect(response.body.last_name).to.equal(user.last_name);
            expect(response.body.email).to.equal(user.email);
            expect(response.body.password_hash);
            expect(response.body.contacts).to.deep.equal(user.contacts);
            expect(response.body.meetings).to.deep.equal(user.meetings);
            done();
          })
          .catch(done);
      });
    });

    it('should fail to get user details (missing auth)', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should fail to get user details for user that does not exist', (done) => {
      request(app)
        .get('/api/users')
        .set('Authorization', 'thisIsAnIncorrectToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
  });


  describe('# GET /api/users/:userId', () => {
    it('should get user details', (done) => {
      // Setup by requesting token of the new user
      request(app)
      .post('/api/auth/login')
      .send(newLoginDetails)
      .then((res) => {
        newToken = `Bearer ${res.body.token}`;
        // Once token is retrieved, try and get user details
        request(app)
          .get(`/api/users/${user._id}`)
          .set('Authorization', newToken)
          .expect(httpStatus.OK)
          .then((response) => {
            expect(response.body.first_name).to.equal(user.first_name);
            expect(response.body.last_name).to.equal(user.last_name);
            expect(response.body.email).to.equal(user.email);
            expect(response.body.password_hash);
            expect(response.body.contacts).to.deep.equal(user.contacts);
            expect(response.body.meetings).to.deep.equal(user.meetings);
            done();
          })
          .catch(done);
      });
    });

    it('should fail to get user details (missing auth)', (done) => {
      request(app)
        .get(`/api/users/${user._id}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should fail to get user details (incorrect auth)', (done) => {
      request(app)
        .get(`/api/users/${user._id}`)
        .set('Authorization', 'thisIsAnIncorrectToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
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
      // Setup by requesting token of the new user
      request(app)
      .post('/api/auth/login')
      .send(newLoginDetails)
      .then((res) => {
        newToken = `Bearer ${res.body.token}`;
        // Once token is retrieved, try and put user details
        user.first_name = 'KK';
        user.password = 'password1234';
        request(app)
          .put(`/api/users/${user._id}`)
          .set('Authorization', newToken)
          .send(user)
          .expect(httpStatus.OK)
          .then((response) => {
            expect(response.body.first_name).to.equal('KK');
            expect(response.body.last_name).to.equal(user.last_name);
            expect(response.body.email).to.equal(user.email);
            expect(response.body.password_hash);
            expect(response.body.contacts).to.deep.equal(user.contacts);
            expect(response.body.meetings).to.deep.equal(user.meetings);
            done();
          })
          .catch(done);
      });
    })
    .timeout(3000);

    it('should fail to update user details (missing auth)', (done) => {
      user.first_name = 'KK';
      user.password = 'password1234';
      request(app)
        .put(`/api/users/${user._id}`)
        .send(user)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should fail to update user details (incorrect auth)', (done) => {
      user.first_name = 'KK';
      user.password = 'password1234';
      request(app)
        .put(`/api/users/${user._id}`)
        .set('Authorization', 'thisIsAnIncorrectToken')
        .send(user)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exist', (done) => {
      request(app)
        .put('/api/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });


  describe('# DELETE /api/users/:userId', () => {
    it('should fail to delete user (missing auth)', (done) => {
      request(app)
          .delete(`/api/users/${user._id}`)
          .expect(httpStatus.UNAUTHORIZED)
          .then((res) => {
            expect(res.body.message).to.equal('Unauthorized');
            done();
          })
          .catch(done);
    });

    it('should fail to delete user (incorrect auth)', (done) => {
      request(app)
          .delete(`/api/users/${user._id}`)
          .set('Authorization', 'thisIsAnIncorrectToken')
          .expect(httpStatus.UNAUTHORIZED)
          .then((res) => {
            expect(res.body.message).to.equal('Unauthorized');
            done();
          })
          .catch(done);
    });

    it('should report error with message - Not found, when user does not exist', (done) => {
      request(app)
        .delete('/api/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });

    it('should delete user', (done) => {
      // Setup by requesting token of the new user
      request(app)
      .post('/api/auth/login')
      .send(newLoginDetails)
      .then((res) => {
        newToken = `Bearer ${res.body.token}`;
        // Once token is retrieved, try and put user details
        request(app)
          .delete(`/api/users/${user._id}`)
          .set('Authorization', newToken)
          .expect(httpStatus.OK)
          .then((response) => {
            expect(response.body.first_name).to.equal('KK');
            expect(response.body.last_name).to.equal(user.last_name);
            expect(response.body.email).to.equal(user.email);
            expect(response.body.password_hash);
            expect(response.body.contacts).to.deep.equal(user.contacts);
            expect(response.body.meetings).to.deep.equal(user.meetings);
            done();
          })
          .catch(done);
      });
    })
    .timeout(3000);
  });
});
