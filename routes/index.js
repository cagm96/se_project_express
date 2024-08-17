const router = require("express").Router();

const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

const { itemNotFound404 } = require("../utils/errors");
const { auth } = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

router.use("/users", auth, userRouter);

router.use("/items", clothingItemRouter);

router.post("/signin", login);

router.post("/signup", createUser);

router.use((req, res) => {
  res.status(itemNotFound404).send({ message: "Router not found " });
});

module.exports = router;
