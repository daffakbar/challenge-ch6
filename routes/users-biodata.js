var express = require("express");
var router = express.Router();
const biodata = require("../controllers/biodataControllers");

// GET GAME BIODATA
router.get("/", biodata.show);
// GET GAME BIODATA BY ID TO UPDATE
router.get("/:id", biodata.showById);
// UPDATE GAME BIODATA BY ID
router.post("/update", biodata.update);

module.exports = router;
