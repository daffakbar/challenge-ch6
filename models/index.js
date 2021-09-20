"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// relation
// db.user_game = require("./user_game")(sequelize, Sequelize);
// db.user_game_biodata = require("./user_game_biodata")(sequelize, Sequelize);
// db.user_game_history = require("./user_game_history")(sequelize, Sequelize);

// //1 to 1
// db.user_game.hasOne(db.user_game_biodata, {
//   name: "id_user_game",
// });
// db.user_game_biodata.belongsTo(db.user_game);

// // 1 to many
// db.user_game.hasMany(db.user_game_history, {
//   name: "id_user_game",
// });
// db.user_game_history.belongsTo(db.user_game);

module.exports = db;
