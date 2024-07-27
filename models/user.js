const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../utils/config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required."],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],

    //This way, the user's password hash won't be
    // returned from the database by default.
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  const user = this.findOne({ email }).then((user) => {
    console.log({ "From userSchema": user });
  });

  return bcrypt.compare(password, user.password).then((err, isMatch) => {
    if (!isMatch) {
      return "incorrect password";
    }

    return user;
  });
};

module.exports = mongoose.model("user", userSchema);
