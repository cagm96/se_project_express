const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const {
  invalidData400,
  unauthorizedReq401,
  itemNotFound404,
  defaultError500,
  requestConflict409,
} = require("../utils/errors");

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(
    "Creating user with name:",
    name,
    ", avatar:",
    avatar,
    ", password:",
    password,
    ", email:",
    email
  );

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(requestConflict409)
        .send({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const newUser = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const { password: pwd, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).send({ data: userWithoutPassword });
  } catch (err) {
    console.error("createUser error name:", err.name);
    if (err.name === "ValidationError") {
      return res.status(invalidData400).send({ message: "Invalid data" });
    }
    if (err.code === 11000) {
      return res.status(requestConflict409).send({
        message:
          "User with this email already exists from createUser controller",
      });
    }
    return res
      .status(defaultError500)
      .send({ message: "An error has occurred on the server." });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by credentials
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log("user object from the login controller", user);

      // Generate JWT
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send token to client
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err.name);

      if (err.message === "Incorrect password or email") {
        return res
          .status(unauthorizedReq401)
          .send({ message: "unauthorized request" });
      }
      return res.status(defaultError500).send({
        message: "Internal server error from the catch in the login controller",
      });
    });

  // Compare the password
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(itemNotFound404).send({ message: "Item ID not found" });
    }
    console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    return res
      .status(defaultError500)
      .send({ error: "Could not find user from getCurrentUser controller " });
  }
};

const modifyUserData = async (req, res) => {
  try {
    const updates = { name: req.body.name, avatar: req.body.avatar };

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).orFail(() => {
      const error = new Error(
        "User ID not found this is comming from modifyUserData"
      );
      error.statusCode = itemNotFound404;
      throw error;
    });

    console.log("updated User from modifyUserData", updatedUser);
    return res.status(200).send(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(invalidData400).send({
        message: "provided data is incorrect",
      });
    }
    return res
      .status(defaultError500)
      .send({ error: "Could not update user from modifyUserData" });
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
};
