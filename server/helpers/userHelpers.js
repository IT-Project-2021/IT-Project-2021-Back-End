const User = require('../user/user.model');
const Person = require('../person/person.model');

// from req.user, extract user ID
async function getUserID(user) {
  const userInfo = await User.findOne({ email: user.email });
  return userInfo._id;
}

// from req.user and a personID, check if the person belongs to the user
async function participantBelongsTo(user, personID) {
  const userID = await getUserID(user);
  const personInfo = await Person.findOne({ _id: personID });
  if (personInfo.user && (personInfo.user.toString() === userID.toString())) {
    return true;
  }
  return false;
}

const userHelpers = {
  getUserID,
  participantBelongsTo
};

module.exports = userHelpers;
