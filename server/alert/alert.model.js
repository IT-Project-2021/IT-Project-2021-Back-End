const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Alert Schema
 */
const AlertSchema = new mongoose.Schema({
  alertTime: {
    type: Date
  },
  alertSetting: {
    type: String
  }
});

/**
 * Statics
 */
AlertSchema.statics = {
  /**
   * Get alert
   * @param {ObjectId} id - The objectId of alert.
   * @returns {Promise<Alert, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((alert) => {
        if (alert) {
          return alert;
        }
        const err = new APIError('No such alert exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List alerts in descending order of '_id'.
   * @returns {Promise<Alert[]>}
   */
  list() {
    return this.find()
      .sort({ _id: -1 })
      .exec();
  }
};

/**
 * @typedef Alert
 */
module.exports = mongoose.model('Alert', AlertSchema);