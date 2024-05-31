const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
};
const getUser = (req, res) => {
  console.log("user id: ", req.params.userID);
  User.findById(req.params.userID)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
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
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, getUser, createUser };
