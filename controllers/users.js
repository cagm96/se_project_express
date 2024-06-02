const User = require("../models/user");
const {
  invalid_data_400,
  item_notFound_404,
  default_error_500,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("Users ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(default_error_500).send({ message: err.message });
    });
};
const getUser = (req, res) => {
  console.log("user id: ", req.params.userID);
  User.findById(req.params.userID)
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return res.status(default_error_500).send({ message: err.message });
    });
};
const createUser = (req, res) => {
  const { name, avatar, about } = req.body;
  console.log("name: ", name, "avatar: ", avatar, "about: ", about);
  User.create({ name, avatar, about })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(default_error_500).send({ message: err.message });
    });
};

module.exports = { getUsers, getUser, createUser };
