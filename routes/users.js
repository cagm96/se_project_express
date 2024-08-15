const router = require("express").Router();

const { getCurrentUser, modifyUserData } = require("../controllers/users");

router.get("/users/me", getCurrentUser);

router.patch("/users/me", modifyUserData);

module.exports = router;
