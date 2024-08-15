const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const { unauthorizedReq401 } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers; // It should verify the token from the headers:

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(unauthorizedReq401)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // If something is wrong with the token, the middleware should return a 401 error.
    return res
      .status(unauthorizedReq401)
      .send({ message: "Authorization required" });
  }

  console.log(payload, "authorization from auth middleware");

  // If there are no issues with the token,
  //the middleware should add the token payload to the
  // user object and call next():
  req.user = payload;
  next();
  // Protect all routes with authorization, except for the following:
  // POST /signin
  // POST /signup
  // GET /items
  // The middleware should return a 401 error when an unauthorized user tries to access protected routes.
};

module.exports = {
  auth,
};
