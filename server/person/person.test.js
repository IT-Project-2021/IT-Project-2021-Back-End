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

describe('## Person APIs', () => {
  let person = {
    first_name: 'John',
    last_name: 'Doe',
    phone_num: '01189998819991197253',
    email: 'johndoe@gmail.com',
    company: 'Company Inc.',
    position: 'Developer',
    notes: 'A very real man.'
  };

  // this is the token for the user johndoe1@gmail.com - userID above
  const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2UxQGdtYWlsLmNvbSIsImlhdCI6MTYzNDcxOTQxNn0.udmTskz0y2d6cpnoI6TDQ-tTRj9U8QWRynFsRZppijw';
  const requestingUserID = '615a606d1689023f75b4320d';

  // this is the token for a different user (with no contacts saved)
  const wrongUserToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvc3RtYW51c2VyQGdtYWlsLmNvbSIsImlhdCI6MTYzNTUxMjA3N30.-3gGN4hj5wHXErGH08gbHcO_2-jECgjtK6qciMaFK4k';

  describe('# POST /api/people', () => {
    it('should create a new person', (done) => {
      request(app)
        .post('/api/people')
        .set('Authorization', validToken)
        .send(person)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(requestingUserID);
          expect(res.body.first_name).to.equal(person.first_name);
          expect(res.body.last_name).to.equal(person.last_name);
          expect(res.body.phone_num).to.equal(person.phone_num);
          expect(res.body.email).to.equal(person.email);
          expect(res.body.company).to.equal(person.company);
          expect(res.body.position).to.equal(person.position);
          expect(res.body.notes).to.equal(person.notes);
          person = res.body;
          done();
        })
        .catch(done);
    });
    it('should fail to create a new person (missing auth)', (done) => {
      request(app)
        .post('/api/people')
        .send(person)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/people/:personId', () => {
    it('should get person details', (done) => {
      request(app)
        .get(`/api/people/${person._id}`)
        .set('Authorization', validToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(person.user);
          expect(res.body.first_name).to.equal(person.first_name);
          expect(res.body.last_name).to.equal(person.last_name);
          expect(res.body.phone_num).to.equal(person.phone_num);
          expect(res.body.email).to.equal(person.email);
          expect(res.body.company).to.equal(person.company);
          expect(res.body.position).to.equal(person.position);
          expect(res.body.notes).to.equal(person.notes);
          done();
        })
        .catch(done);
    });
    it('should fail to get person details (bad auth)', (done) => {
      request(app)
        .get(`/api/people/${person._id}`)
        .set('Authorization', wrongUserToken)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
    it('should fail to get person details (missing auth)', (done) => {
      request(app)
        .get(`/api/people/${person._id}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
    it('should report error with message - Not found, when person does not exist', (done) => {
      request(app)
        .get('/api/people/888888888888888888888888')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    }).timeout(3000);
  });

  describe('# PUT /api/:personId', () => {
    it('should update person details', (done) => {
      person.first_name = 'Yeet';
      request(app)
        .put(`/api/people/${person._id}`)
        .send(person)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(person.user);
          expect(res.body.first_name).to.equal('Yeet');
          expect(res.body.last_name).to.equal(person.last_name);
          expect(res.body.phone_num).to.equal(person.phone_num);
          expect(res.body.email).to.equal(person.email);
          expect(res.body.company).to.equal(person.company);
          expect(res.body.position).to.equal(person.position);
          expect(res.body.notes).to.equal(person.notes);
          done();
        })
        .catch(done);
    }).timeout(3000);
  });

  describe('# GET /api/people/', () => {
    it('should get all people', (done) => {
      request(app)
        .get('/api/people')
        .set('Authorization', validToken)
        .expect(httpStatus.OK)
        .then((res) => {
          // check that the response is an array of contacts beloning to the user
          expect(res.body).to.be.an('array');
          for (let i = 0; i < res.body.length; i += 1) {
            expect(res.body[i].user.toString()).to.equal(requestingUserID);
          }
          done();
        })
        .catch(done);
    });
    it('should get all people (for a user with no contacts)', (done) => {
      request(app)
        .get('/api/people')
        .set('Authorization', wrongUserToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(0);
          done();
        })
        .catch(done);
    });
    it('should fail to get all people (missing auth)', (done) => {
      request(app)
        .get('/api/people')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/people/:personId', () => {
    it('should delete person', (done) => {
      request(app)
        .delete(`/api/people/${person._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user).to.equal(person.user);
          expect(res.body.first_name).to.equal('Yeet');
          expect(res.body.last_name).to.equal(person.last_name);
          expect(res.body.phone_num).to.equal(person.phone_num);
          expect(res.body.email).to.equal(person.email);
          expect(res.body.company).to.equal(person.company);
          expect(res.body.position).to.equal(person.position);
          expect(res.body.notes).to.equal(person.notes);
          done();
        });
      // .catch
    }).timeout(3000);
  });
});
