const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Meeting Schema
 */
const MeetingSchema = new mongoose.Schema({
  details: {
    type: String
  },
  date: {
    type: Date
  },
  location: {
    type: String
  },
  participants: [String],
  agenda: [String],
  alerts: [{
    alertTime: {
      type: String
    },
    alertSetting: {
      type: String
    }
  }]
});

/**
 * Statics
 */
MeetingSchema.statics = {
  /**
   * Get meeting
   * @param {ObjectId} id - The objectId of meeting.
   * @returns {Promise<Meeting, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((meeting) => {
        if (meeting) {
          return meeting;
        }
        const err = new APIError('No such meeting exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      }
      );
  },

  /**
   * List meegstin in descending order of 'date'.
   * @returns {Promise<Meeting[]>}
   */
  list() {
    return this.find()
      .sort({ date: -1 })
      .exec();
  }
};

/**
 * @typedef Meeting
 */
module.exports = mongoose.model('Meeting', MeetingSchema);
