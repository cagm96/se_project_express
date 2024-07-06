const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  invalidData400,
  itemNotFound404,
  defaultError500,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error("getUsers error name", err.name);
      return res
        .status(defaultError500)
        .send({ message: "An error has occurred on the server." });
    });
};
const getUser = (req, res) => {
  console.log("user id: ", req.params.userID);
  User.findById(req.params.userID)
    .orFail(() => {
      const error = new Error("User ID not found this is comming from .orFail");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error("getUser error name is: ", err.name);
      if (err.name === "CastError") {
        return res.status(invalidData400).send({ message: "Invalid ID" });
      }
      if (err.name === "Error") {
        return res.status(itemNotFound404).send({ message: err.message });
      }
      return res
        .status(defaultError500)
        .send({ message: "An error has occurred on the server." });
    });
};
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(
    "Creating user with name:",
    name,
    "avatar:",
    avatar,
    "password:",
    password,
    "email:",
    email
  );

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(password, 10)
          .then((hash) => User.create({ name, avatar, email, password: hash }))
          .then((user) => {
            res.send({ data: user });
          });
      }
    })
    .catch((err) => {
      console.error("createUser error name:", err.name);
      if (err.name === "ValidationError") {
        return res.status(invalidData400).send({ message: "Invalid data" });
      }
      if (err.name === 11000) {
        return res.status(1100).send({ messsage: "MongoDB duplicate error" });
      }
      return res
        .status(defaultError500)
        .send({ message: "An error has occurred on the server." });
    });
};

//1.  Check that there's not already an existing user with an email matching the one contained
// in the request body.
//2.  Since the email field is set as required in the user schema,
// the User.create() function will throw a 11000 error (a MongoDB duplicate error).
// Handle this error code in a throw block and return a corresponding error message.
//3.  Make sure that passwords are hashed before being saved to the database.

module.exports = { getUsers, getUser, createUser };
