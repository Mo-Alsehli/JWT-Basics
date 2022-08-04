const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();

const jwtSecret = process.env.JWTSECRET;

const dashboard = (req, res) => {
  let luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).send({
    msg: `Hello, ${req.user.username}`,
    secret: `This Is Dashboard Your Lucky Number Is ${luckyNumber}`,
  });
};

const login = (req, res) => {
  // const user = { username: req.body.username, password: req.body.password };
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Username And Password must be provided", 400);
  }
  const token = jwt.sign({ username }, jwtSecret);
  res.status(200).send({ msg: "user created", token });
};

module.exports = { dashboard, login };
