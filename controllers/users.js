const User = require("../models/user");
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
        return res.status(invalidData400).send({ message: err.message });
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
  const { name, avatar } = req.body;
  console.log("Creating user with name:", name, "avatar:", avatar);

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error("createUser error name:", err.name);
      if (err.name === "ValidationError") {
        return res.status(invalidData400).send("Invalid data: ", err.message);
      }
      return res
        .status(defaultError500)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { getUsers, getUser, createUser };
