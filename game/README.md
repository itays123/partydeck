# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Architecture

### Game utilities

The entire application is based on 3 enums that toggle the current stage of the game:

```ts
enum GameLifecycle {
  PRE_CREATED, // initial state
  CREATED, // lobby state
  RESUMED, // round is active
  PAUSED, // too many players disconnected
  STOPPED, // game sucessfully ended
  DESTROYED, // game paused for too long
}

enum ConnectionLifecycle {
  PRE_CREATED, // initial state
  GOING_AWAY, // disconnected, but saving the data. This can happen before page reload, for example
  REFRESHING, // disconnected, but found saved data. For instance, on page reload after refresh
  RESUMED, // connected
  PAUSED, // unexpected disconnection, but attempting reconnection
  FINISHED, // sucessfully ended the game
  DESTROYED, // unexpected disconnection, and could not reconnect
}

enum RoundLifecycle {
  USE, // the player should submit an answer
  PENDING_PLAYER_USAGES, // the player is waiting for other players to submit answers
  PICK, // the player judges in this round, and has to pick a winner
  PENDING_JUDGE_PICK, // the player is not the judge in this round, and waiting for the judge pick
  PENDING_ADMIN_ACTION, // the round is ended, waiting for the game admin to start the next round
  WAITING_FOR_DATA, // round data is missing
}
```

- The `GameContext` is responsible for connecting to the server, maintaining the game state and toggling between those states.

### Components

The components folder consists of:

- The `brand` folder contains brand-related resources
- The `Card`component is a general UI wrapper
- `CardPicker` is the component responsible for displaying decks and animating them
- `GameCodeDisplay` displays the game code in the bottom of the screen
- the `glyphs` and `icons` folder are for svg-related resources
- The `PageTitle` component
- The `PlayerIterator` component, that displays a grid of cards with the player names on it.
- `QuestionJudgeDisplay`, responsible for displaying the round question and judge
- A simple `Spinner` component
- My custom `ThemeProvider` wrapper and `useBackground` hook
- My custom form utilities
- Context actions and logical warppers that [broke the internet](https://dev.to/itays123/using-the-react-context-api-the-right-way-a-time-saver-5c3f)

It also contains the `LocalStorageConnectionRestorer`, a component responsible for controlling the `ConnectionLifeCycle.GOING_AWAY` and `ConnectionLifeCycle.REFRESHING` states.

Other than those, we have a few simple components that provide feedback on special game states:

- `ConnectionPauseFeedback`, when `GameLifeCycle.RESUMED` and `ConnectionLifeCycle.PAUSED`
- `GamePauseFeedback`, when `GameLifeCycle.PAUSED` and `ConnectionLifeCycle.RESUMED`
- `InvalidRoundFeedback`, when `GameLifeCycle.RESUMED`, `GameLifeCycle.RESUMED`, but `RoundLifeCycle.WAITING_FOR_DATA`
- `PlayerAnswerFeedback`, when `RoundLifeCycle.PENDING_PLAYER_USAGES`
- `UnexpectedDisconnectionDialog`, when `GameLifeCycle.DESTROYED` or `RoundLifeCycle.DESTROYED`

### The Join Form

The group of components that are visible when `GameLifeCycle.PRE_CREATED` and `ConnectionLifeCycle.PRE_CREATED`.

Their main functionality is to collect the game code and name from the user and connect them to the live game in the server via `WebSocket`.

### The Lobby

The group of components that are visible when `GameLifeCycle.CREATED` and `ConnectionLifeCycle.RESUMED`.

Their main functionality is to display the game code and the connected players.

### The Round Layout

The group of components that are visible on active rounds.

Consists of:

- The use deck layout, that displays the `use` deck on `RoundLifeCycle.USE`
- The before options ready layout, that displays the `PlayerAnswerFeedback` component as well as skip options for game admins
- The options ready layout, that displays the pick deck and allows the jduge to pick the winner card
- The round ended layout, that shows who won and displays the next round and stop game buttons for the admin.

### The Game Over Screen

The group of components that are visible when `ConnectionLifeCycle.FINISHED` and `GameLifeCycle.STOPPED`.

Their main functionality is to show the scoreboard and display a confetti if the user is within the podium.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
