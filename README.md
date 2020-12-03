# Partydeck - A cool online card game

The `Partydeck` app contains 5 microservices, all connected:

- **The live `server`**, responsible for creating live games, shufling the cards and generating game codes. Powered by the brand new `Deno` runtime.
- **The `storage` API**, responsible for storing a game's cards and title. The storage server is a traditional `Node.js` and `MongoDB` server.
- **The live `game`**, the fronend `React.js` app that connects to the live server.
- **The game `panel`**, the frontend `React.js` UI to create games.
- **The `main` partydeck website**
