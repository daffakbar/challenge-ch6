const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const rhs = process.env.SECRET || "rahasia";

module.exports = {
  login: async (req, res, next) => {
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
  },
  midd: async (req, res, next) => {
    var token = await req.headers["authorization"];

    console.log(token);
    if (token) {
      try {
        const decoded = jwt.verify(token, rhs);
        req.data = decoded;
      } catch (error) {
        return res.status(401).send("Invalid Token");
      }
      return next();
    } else {
      // return res.status(403).send({
      //   success: false,
      //   msg: "token tidak tersedia",
      // });
      res.render("error-page");
    }
  },
};
