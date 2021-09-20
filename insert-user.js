const { user_game } = require("./models");

user_game
  .create({
    username: "daffa",
    password: "12345",
    email: "daffa@gmail.com",
    generate_random: "affad",
  })
  .create({
    username: "daffa",
    password: "12345",
    email: "daffa@gmail.com",
    generate_random: "affad",
  })
  .then((result) => {
    console.log(result);
  });
