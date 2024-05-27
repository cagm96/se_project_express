const router = require("express").Router();

const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userID", getUser);
router.post("/", createUser);
router.use((req, res, next) => {
  console.log(res);
});

module.exports = router;

// Non-existent resources
// Handle cases when the client request is sent to a non-existent
//  resource. You can do it by checking the result status code inside
//  router.use(). If the resource doesn't exist, the server should
//  respond with the following message:
// {
//   "message": "Requested resource not found"
// }
