const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  invalidData400,
  itemNotFound404,
  defaultError500,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

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

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;
//   console.log(
//     "Creating user with name:",
//     name,
//     ", avatar:",
//     avatar,
//     ", password:",
//     password,
//     ", email:",
//     email
//   );

//   const existingUser = await  User.findOne({ email });

//         if (existingUser) {
//           return res
//             .status(400)
//             .send({ message: "User with this email already exists" });
//         }

//         // Hash the password
//        const hashedPassword = await bcrypt.hash(password, 10);
//        const NewUser = User.create({ name, avatar, email, password: hash });

//             res.status(201).send({ data: newUser });

//       .catch((err) => {
//         console.error("createUser error name:", err.name);
//         if (err.name === "ValidationError") {
//           return res.status(400).send({ message: "Invalid data" });
//         }
//         if (err.code === 11000) {
//           return res
//             .status(409)
//             .send({ message: "User with this email already exists" });
//         }
//         return res
//           .status(500)
//           .send({ message: "An error has occurred on the server." });
//       });
// };

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
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const newUser = await User.create({
      name: name,
      avatar: avatar,
      email: email,
      password: hashedPassword,
    });

    const { password: pwd, ...userWithoutPassword } = newUser.toObject();

    res.status(201).send({ data: userWithoutPassword });
  } catch (err) {
    console.error("createUser error name:", err.name);
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: "Invalid data" });
    }
    if (err.code === 11000) {
      return res.status(409).send({
        message:
          "User with this email already exists from createUser controller",
      });
    }
    return res
      .status(500)
      .send({ message: "An error has occurred on the server." });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by credentials
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log("user object from the login controller", user);
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      // Check if user ID or JWT_SECRET is undefined
      if (!user._id || !JWT_SECRET) {
        console.error("user._id or JWT_SECRET is undefined");
        return res
          .status(500)
          .send({ message: "Internal server error from the try statement" });
      }

      // Generate JWT
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send token to client
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err.name);
      if (err.name === "Error") {
        return res.status(400).send({
          message:
            " Authorization with non-existent email and password in the database",
        });
      }

      res.status(500).send({
        message:
          "Internal server error from the catch in the login controller" + err,
      });
    });

  // Compare the password
};

const getCurrentUser = (req, res) => {
  // The controller should return the logged-in user data based
  // on the _id value.
  //
  // console.log("Current user from getCurrentUser controller", user);
  // return res.json({ userId: currentUser });

  try {
    User.findOne(req.user).then((user) => {
      if (!user) {
        throw new Error();
      }
      console.log(user);
      return res.status(200).send(user);
    });
  } catch (error) {
    res
      .status(401)
      .send({ error: "Could not find user from getCurrentUser controller " });
  }
};

const modifyUserData = (req, res) => {
  //This route should only allow modification of the name and
  //avatar fields.
  //You'll need to return an updated object in the response
  //(using the new property). Don't forget to handle Not Found,
  //Validation, and default server errors for these routes.
  //Recall that you’ve already set up your user model to validate
  //that the data used meets certain criteria. However, by default,
  //this validation won’t be run when updating a resource.
  //You can refer to the documentation for information on how
  //to enable validators.
  try {
    const updates = { name: req.body.name, avatar: req.body.avatar };

    User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    })
      .orFail(() => {
        const error = new Error(
          "User ID not found this is comming from modifyUserData"
        );
        error.statusCode = 404;
        throw error;
      })
      .then((updatedUser) => {
        console.log("updated User from modifyUserData", updatedUser);
        return res.status(200).send(updatedUser);
      });
  } catch (error) {
    res
      .status(401)
      .send({ error: "Could not update user from modifyUserData" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  modifyUserData,
};
