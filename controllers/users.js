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
const getUser = (req, res) => {};
const createUser = (req, res) => {
  const { name, avatar, about } = req.body;
  console.log(name, avatar, about);
};

module.exports = { getUsers, getUser, createUser };
