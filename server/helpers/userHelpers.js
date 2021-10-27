const User = require('../user/user.model');

// from req.user, extract user ID
async function getUserID(user) {
  const userInfo = await User.findOne({ email: user.email });
  return userInfo._id;
}

const userHelpers = {
  getUserID
};

module.exports = userHelpers;
