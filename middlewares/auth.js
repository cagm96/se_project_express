const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { unauthorizedReq401 } = require("../utils/errors");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers; // Verifies the token from the headers.

    // Check if the authorization header exists and starts with "Bearer"
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(unauthorizedReq401)
        .send({ message: "Authorization required" }); // unauthorizedReq401
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Attach payload to request object

    next(); // Proceed to the next middleware or route handler
    return "";
  } catch (err) {
    return res
      .status(unauthorizedReq401)
      .send({ message: "Authorization required" }); // unauthorizedReq401
  }
};

module.exports = {
  auth,
};
