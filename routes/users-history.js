var express = require("express");
var router = express.Router();
const history = require("../controllers/historyControllers");

// GET GAME HISTORY
router.get("/", history.show);
// GET GAME HISTORY BY ID
router.get("/:id", history.showById);

module.exports = router;
