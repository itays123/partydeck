# Partydeck's storage API

This is a traditional `Node.js` server.

## Routes

### Public Routes

- `GET` **`/search`**: Searches for public games.
- `GET` **`/play/:gameId`**: Generates a `playable` game and sends it to the live server.
- `GET` **`/:user`**: Gets all user public games.

### Game Routes

- `GET` **`/game`**: Returns all games of a user
- `POST` **`/game`**: Creates a new game.
- `GET` **`/game/:id`**: Returns a game (if game is public or requested by author).
- `PUT` **`/game/:id`**: Updates a game.
- `DELETE` **`/game/:id`**: Deletes a game.

### Auth Routes

- `POST` **`/auth/login`**: Basic email-password login.
- `POST` **`/auth/register`**: Creates a new user.
- `GET` **`/auth/check`** checks if email is in use.
