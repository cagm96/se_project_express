const router = require("express").Router();

const clothingItem = require("./clothingItem");

const userRouter = require("./users");

const { invalidData404 } = require("../utils/errors");

const {
  login,

  createUser,
} = require("../controllers/users");

const { auth } = require("../middlewares/auth");

router.use("/users", auth, userRouter);

router.use("/items", clothingItem);

router.post("/signin", login);

router.post("/signup", createUser);

router.use((req, res) => {
  res.status(invalidData404).send({ message: "Router not found " });
});

module.exports = router;
