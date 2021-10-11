const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Person Schema
 */
const PersonSchema = new mongoose.Schema({
  user: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone_num: {
    type: String
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  position: {
    type: String
  },
  notes: {
    type: String
  }
});

/**
 * Statics
 */
PersonSchema.statics = {
  /**
  * Get person
  * @param {ObjectId} id - The objectId of person.
  * @returns {Promise<Person, APIError>}
  */
  get(id) {
    return this.findById(id)
      .exec()
      .then((person) => {
        if (person) {
          return person;
        }
        const err = new APIError('No such person exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      }
      );
  },

  /**
   * List people in descending order of 'last_name'.
   * @returns {Promise<Person[]>}
   */
  list() {
    return this.find()
      .sort({ last_name: -1 })
      .exec();
  }
};

/**
 * @typedef Person
 */
module.exports = mongoose.model('Person', PersonSchema);
