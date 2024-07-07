const router = require("express").Router();

const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userID", getUser);
router.post("/signup", createUser);

module.exports = router;
