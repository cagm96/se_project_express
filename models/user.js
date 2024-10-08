const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    select: false,
    // This way, the user's password hash won't be

    // returned from the database by default.
  },
  name: {
    type: String,
    required: [true, "The name field is required."],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name bust be no more than 30 characters long"],
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
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return Promise.reject(new Error("Incorrect password or email"));
        }
        return user; // Only return user if password matches
      });
    });
};
module.exports = mongoose.model("User", userSchema);
