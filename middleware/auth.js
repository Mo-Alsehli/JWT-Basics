const jwt = require("jsonwebtoken");
const CustomAPIError = require("./error-handler");
require("dotenv").config();

const jwtSecret = process.env.JWTSECRET;

const jwtAuth = (req, res, next) => {
  let authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new CustomAPIError("Token must be provided", 401);
  }

  let token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError(
      "Unvalid Token, Unable To Access To This Route",
      401
    );
  }
};

module.exports = jwtAuth;
