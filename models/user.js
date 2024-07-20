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

    select: false, //This way, the user's password hash won't be
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
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  // trying to find the user by email
  return this.findOne({ email }) // this — the User model
    .then((user) => {
      // not found - rejecting the promise
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      // found - comparing hashes
      return bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("bcrypt compare error:", err);
          return res.status(500).send({ message: "Internal server error" });
        }
        if (!isMatch) {
          return res.status(401).send({ message: "Invalid email or password" });
        }
        if (!user._id || !JWT_SECRET) {
          console.error("user._id or JWT_SECRET is undefined");
          return res.status(500).send({ message: "Internal server error" });
        }
        console.log("User ID:", user._id);
        console.log("JWT_SECRET:", JWT_SECRET);
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          //JWT_SECRET contains a value of your secret key for the signature
          expiresIn: "7d",
        });
        //Once the JWT has been created, it should be sent to
        //the client in the response body
        res.send({ token });
      });
    });
};

module.exports = mongoose.model("user", userSchema);
