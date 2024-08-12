const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { invalidData404 } = require("../utils/errors");
const {
  login,
  createUser,
  getCurrentUser,
  modifyUserData,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.use("/users", auth, userRouter);
router.use("/items", auth, clothingItem);
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, getCurrentUser, modifyUserData);
router.use((req, res) => {
  res.status(invalidData404).send({ message: "Router not found " });
});

module.exports = router;
