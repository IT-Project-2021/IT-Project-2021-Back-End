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

  describe('# POST /api/people', () => {
    it('should create a new person', (done) => {
      request(app)
        .post('/api/people')
        .send(person)
        .expect(httpStatus.OK)
        .then((res) => {
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
  });

  describe('# GET /api/people/:personId', () => {
    it('should get person details', (done) => {
      request(app)
        .get(`/api/people/${person._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
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
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
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
