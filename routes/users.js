const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userID", getUser);
router.post("/", createUser);
router.use((req, res, next) => {
  res.status(404).json({ message: "Requested resource not found" });
});

module.exports = router;
