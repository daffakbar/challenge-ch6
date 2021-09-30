const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = {
  show: async (req, res) => {
    const getUserGame = await user_game.findAll();

    if (getUserGame) {
      res.status(200).json({
        status: 200,
        msg: "berhasil get all user game",
        data: getUserGame,
      });
    } else {
      res.status(400).json({
        status: 400,
        msg: "tidak ditemukan data",
      });
    }
  },
  showView: async (req, res) => {
    const getUserGame = await user_game_biodata.findAll({
      include: [{ model: user_game, as: "user_biodata" }],
    });

    // res.status(200).json({
    //   data: getUserGame,
    // });
    res.render("usergame", { getUserGame });
  },
  remove: async (req, res) => {
    const deleteUser = await user_game.destroy({
      where: {
        id: req.params.id,
      },
    });
    const deleteGame = await user_game_biodata.destroy({
      include: [{ model: user_game, as: "user_biodata" }],
      where: {
        id: req.params.idx,
      },
    });
    if (!deleteUser) {
      res.status(400).json({ msg: "Data user tidak ada" });
    }
    // res.status(200).json({
    //   status: 200,
    //   msg: "berhasil delete user game",
    //   // data: deleteUser,
    // });
    res.render("usergame", { getUserGame });
  },
  create: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await user_game.findOne({
      where: { username: req.body.username },
    });

    if (data) {
      return res.status(400).json({ message: "username sudah ada" });
    }
    // logika random
    // username + random angka

    // random 3 data
    let suggestRandom = [];
    for (let i = 0; i < 3; i++) {
      let randomAngka = Math.floor(Math.random() * 3);
      suggestRandom.push(req.body.username + randomAngka.toString());
    }

    // hashing password
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      // Store hash in your password DB.

      user_game
        .create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          generate_random: suggestRandom[0],
        })
        .then((result) => {
          user_game_biodata.create({
            alamat: req.body.alamat,
            notelp: req.body.notelp,
            nama: req.body.nama,
            tanggal_lahir: req.body.tanggal_lahir,
            id_user_game: result.id,
          });
          message = "berhasil menambahkan data";
          return res.redirect("users-game/view");
          // return res
          //   .status(201)
          //   .json({ code: 201, message: message, data: result });
          // res.redirect("users-game/view");
        });
    });
  },
};
