const User = require("../model/user");

module.exports = {
  login: function(user_name) {
    return User.find({ user_name: user_name });
  },
  signUp: function(data) {
    return User.create(data);
  },
  delete: function(id) {
    return User.deleteOne({ _id: id });
  }
};
