var express = require("express");
const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// GET GAME HISTORY
router.get("/", async (req, res) => {
  const getGamerHistory = await user_game_history.findAll({
    include: [{ model: user_game, as: "user_history" }],
  });

  res.status(200).json({
    data: getGamerHistory,
  });
});

// GET GAME HISTORY BY ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const getGamerHistory = await user_game_history.findAll({
    include: [{ model: user_game, as: "user_history" }],
    where: {
      id_user_game: id,
    },
  });

  // res.status(200).json({
  //   data: getGamerHistory,
  // });
  res.render("userhistory", { getGamerHistory });
});

module.exports = router;
