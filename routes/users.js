var express = require("express");
var router = express.Router();
const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var secret = "secret";
var dotenv = require("dotenv");
// require("dotenv").config;
dotenv.config();
const rhs = process.env.SECRET || "rahasia";
// const config = require("../config");
// const app = require("../app");
// app.set("secretKey", config.secret);

/* GET users listing. */
router.post("/", async (req, res, next) => {
  const data = await user_game.findOne({
    where: { email: req.body.email },
  });
  if (!data) {
    res.json({ success: false, msg: "Email tidak terdaftar" });
  } else {
    // bcrypt.compareSync(req.body.password, 10, function (err, result) {

    const validPass = await bcrypt.compare(req.body.password, data.password);
    if (!validPass) {
      res.status(400).json({ error: "Invalid Password" });
    } else {
      var token = jwt.sign(data.toJSON(), rhs, {
        expiresIn: "24h",
      });
      res.status(200).json({ message: "Valid password", token: token });
    }
  }
});

module.exports = router;
