# Partydeck live server

## Routes

- `GET` **`/check`**: Checks if a game exists.
- `POST` **`/create`**: Creates a game with the added playable.
- `WEBSOCKET` **`/`**: Adds a user to an existing game.

## Architecture

### Deno

The server is built with the brand new Deno runtime, do it might be unstable.

### Object-Oriented Typescript

The server has many objects created in order to make the code more readable and reusable.

## Objects Used

- `LinkedList` and `Queue`

### Circle<T>

- attributes
  - `queue: Queue<string>` is used to circle throught the ids of the map.
  - `map: Map<string, T>` is used to identify the next id in line.
- methods
  - `addEntry(id: string, value: T): void`
  - `removeEntry(id: string): void`
  - `valueOf(id: string): T | null`
  - `has(id: string): boolean`
  - `values(): Iterable<T>`
  - `circle(): T`: returns the next object in line, and enquques it in the back of the queue.
  - `peek(): T | null`
  - `get size(): number`

### Deck<T>

The deck auto-generates the ids itself.

- attributes
  - `queue: Queue<string>` is used to circle throught the ids of the map.
  - `map: Map<string, T>` is used to identify the next id in line.
- methods
  - `addEntryToMap(value: T): string` returns the new id
  - `pickTopCard(): T`
  - `insertCardInBottom(cardId: string): void`
  - `valueOf(id: string): T | null`
  - `valuesOf(ids: string[]): T[]`
  - `format(id: string)`, `formatMany(ids: string[])` returns a JSON-ready object.
  - `status(): T[]` returns the `values()` of the `map` as an array.

### abstract BasePlayer

The BasePlayer class was created in order to extend it for test usages and production usages.

- attributes
  - `id: string` is used to identify the player in the game.
  - `nickname: string`
  - `isAdmin: boolean`
  - `isJudge: boolean`
  - `currentCards: Map<string, string>`
  - `cardsWon: Set<string>`
  - handlers defined by the parent object, of those events:
    - `use`
    - `disconnect`
    - `start` for an admin start request
    - `stop` for an admin stop request
- methods
  - `setAdmin(): void`
  - `setJudge(): void` and `setPlayer(): void` for toggling the judge state
  - `addToCardsWon(cardId: string): void`
  - `on(event: 'use'|'disconnect'|..., handler: Function)` for setting the handlers
  - `useCard(cardId: string): void` calls the useHandler.
  - abstract methods:
    - `broadcast(message: any): Promise<void>`
    - `closeConnection(): Promise<void>`

### TestPlayer extends BasePlayer

The test player object has no special implementations.

### Player extends BasePlayer

The player is the production implementation of the BasePlayer object

- attributes:
  - `connection: Websocket`
  - `pickedCard: string | null` for ease of accessing this object across methods.
  - `isConnected: boolean`
- methods:
  - `handleWebSocket(): Promise<void>`
  - `pickCard(cardId: string)` for judging operations
  - `formatCardsMap(): withNumericId<string>[]` returns a JSON-ready array of the `currentCards` identifier.

### Game<PlayerType extrends BasePlayer>

- attributes:
  - `players: Circle<PlayerType>`
  - `createPlayer: PlayerFactory<PlayerType>`
  - `questionDeck: Deck<string>`
  - `answerDeck: Deck<string>`
  - `roundCards: PickedCard[]`
  - `pickTimeout: number` (defaults to 30 seconds)
  - `numberOfRounds: number`
  - `isStarted: boolean` modified on admin start event
  - `stopRequested: boolean` modified on admin stop event
  - `roundDelay: number` (defaults to 5 seconds)
  - event handlers defined by the parent object, of those events:
    - `round`
    - `start`
    - `end`
    - `connection` (modifies the createPlayer variable)
- methods:
  - private handlers to use when creating player objects:
    - `handleCardUsage: UseHandler`
    - `handlePlayerDisconnection: DisconnectHandler`
    - `cyclePlayer(...args: any[]): PlayerType`
  - `addPlayer(name: string, ...args: any[]): PlayerType | null`
  - `notifyAll(message: any, round: number): Promise<void>`
  - private `waitUntilCardsPicked(): Promise<void>` - a helper function for the `start()` function
  - `start(): Promise<ScoreboardRow[]>`
  - `stop(): void`
  - `get scores(): ScoreboardRow[]`
  - `get playerCount(): number`
