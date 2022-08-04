const express = require("express");
const jwtAuth = require("../middleware/auth");
const Router = express.Router();
const { dashboard, login } = require("../controllers/main");

Router.route("/dashboard").get(jwtAuth, dashboard);
Router.route("/login").post(login);

module.exports = Router;
