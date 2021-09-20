# Challenge 6

## Daftar Endpoint :

### With JWT TOKEN

- /login, method POST

### user-game

- /users-game , method yang digunakan GET

  - JSON get all user_game table

- /users-game , method yang digunakan POST

  - Input Table = user_game & user_biodata

- /users-game/view , method yang digunakan GET

  - Render EJS Table = user_game & user_biodata

- /users-game/delete/:id1/id2 , method yang digunakan DELETE
  - DELETE Table = user_game & user_biodata BY Id

### users-biodata

- /users-biodata , method yang digunakan GET
  - JSON get all Table = user_game & user_biodata
- /users-biodata/:id , method yang digunakan GET
  - Render EJS Form Update Table = user_game & user_biodata BY Id
- /users-biodata/update , method yang digunakan POST
  - Update Form Table = user_game & user_biodata BY Id

### users-history

- /users-history , method yang digunakan GET
  - JSON get all Table = user_game & users_history
- /users-history/:id , method yang digunakan GET
  - Render EJS Table = user_game & user_history BY Id
