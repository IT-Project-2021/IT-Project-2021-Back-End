const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');
const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Auth APIs', () => {
  const validUserCredentials = {
    email: 'johndoe1@gmail.com',
    password: 'hunter2'
  };

  const invalidPassword = {
    email: 'johndoe1@gmail.com',
    password: 'IDontKnow'
  };

  const invalidEmail = {
    email: 'johndoe@yahoo.com',
    password: 'meh'
  };

  let jwtToken;

  describe('# POST /api/auth/login', () => {
    it('should return Incorrect password', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(invalidPassword)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.errorMessage).to.equal('Incorrect password.');
          done();
        })
        .catch(done);
    });

    it('should return invalid email', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(invalidEmail)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.errorMessage).to.equal('User with that email not found.');
          done();
        })
        .catch(done);
    });

    it('should get valid JWT token', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          jwt.verify(res.body.token, config.jwtSecret, (err, decoded) => {
            expect(err).to.not.be.ok; // eslint-disable-line no-unused-expressions
            expect(decoded.username).to.equal(validUserCredentials.username);
            jwtToken = `Bearer ${res.body.token}`;
            done();
          });
        })
        .catch(done);
    });
  });

  describe('# GET /api/auth/random-number', () => {
    it('should fail to get random number because of missing Authorization', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should fail to get random number because of wrong token', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should get a random number', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', jwtToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.num).to.be.a('number');
          done();
        })
        .catch(done);
    });
  });
});
