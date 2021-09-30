const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");

module.exports = {
  show: async (req, res) => {
    const getGamerHistory = await user_game_history.findAll({
      include: [{ model: user_game, as: "user_history" }],
    });

    res.status(200).json({
      data: getGamerHistory,
    });
  },
  showById: async (req, res) => {
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
  },
};
