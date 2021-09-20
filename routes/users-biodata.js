var express = require("express");
const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// GET GAME BIODATA
router.get("/", async (req, res) => {
  const getGameBiodata = await user_game_biodata.findAll({
    include: [{ model: user_game, as: "user_biodata" }],
  });

  res.status(200).json({
    data: getGameBiodata,
  });
});
// GET GAME BIODATA BY ID TO UPDATE
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const getGameBiodata = await user_game_biodata.findOne({
    include: [{ model: user_game, as: "user_biodata" }],
    where: {
      id: id,
    },
  });

  // res.status(200).json({
  //   data: getGameBiodata,
  // });
  res.render("userbiodata", { getGameBiodata });
});
// UPDATE GAME BIODATA BY ID
router.post("/update", async (req, res) => {
  // const id = req.params.id;
  user_game_biodata
    .update(
      {
        alamat: req.body.alamat,
        notelp: req.body.notelp,
        nama: req.body.nama,
        tanggal_lahir: req.body.tanggal_lahir,
        id_user_game: req.body.id_user_game,
      },
      {
        where: {
          id: req.body.idx,
        },
      }
    )
    .then((result) => {
      user_game.update(
        {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
    });

  // res.status(200).json({
  //   data: getGameBiodata,
  // });
  // res.render("userbiodata", { getGameBiodata });
  res.redirect("/users-game/view");
});

module.exports = router;
