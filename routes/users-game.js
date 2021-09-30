var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
const users = require("../controllers/usersControllers");

/* POST USER GAME */
router.post(
  "/",
  body("username").notEmpty().withMessage("username tidak boleh kosong"),
  body("email").isEmail().withMessage("tidak sesuai format email"),
  body("password")
    .notEmpty()
    .withMessage("password tidak boleh kosong")
    .isLength({ min: 8 })
    .withMessage("minimal 8 karakter"),

  users.create
);
// GET USER GAME
router.get("/", users.show);
// GET USER GAME VIEW
router.get("/view", users.showView);
// DELETE USER GAME BY ID
router.delete("/delete/:id/:idx", users.remove);

module.exports = router;
