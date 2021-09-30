var express = require("express");
var router = express.Router();
const auth = require("../controllers/authControllers");

router.post("/", auth.login);

module.exports = router;
