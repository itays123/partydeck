# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Components & Hooks

### Card

- `Card` is the component responsible for displaying a card
- `CardPicker` is responsible for displaying a list of `Card`s
- `Deck` is the component that tracks use / pick and renders the matching `CardPicker`.

### Game

- `GameContextProvider`, `useGameContext` are the hook and component responsible for using the `GameContext`. The context's value is the `gameReducer`'s state.
- `useWebsocket` is the component responsible for dispatching events of the reducer as a result of websocket events.

### Lobby

- `JoinForm` is the component responsible for collecting the name and game code of the user.
- `Lobby` is the page that renders if the websocket connection is not open and was never closed before.
- `LobbyLoader` is the component responsible for showing a `Spinner` and the matching loading message.
- `useGameCheck` is the component responsible for validating the game code.

### Round

- `EndGameButton` is a button shown by the end of a round for the game admin
- `LoadingFeedback` is the component responsible for showing what's happenning in the game.
- `Question` is the component responsible for displaying the current question and judge.
- `RoundContextProvider` and `useRoundContext` are the component and hook responsible for using the `RoundContext`, that stores the round current state and player activity.
- `Waiting` is a compbination of the `Spinner` and a text used by the `LoadingFeedback` compnent.

### Scoreboard

- `Row` is the component responsible for displaying a player name and score.
- `Scoreboard` is the component rendered when the websocker connection has been closed.

### Shared Components

- Navigation
  - `Navbar` is the app's header
  - `NavWrapper` is the component responsible for positioning the navbar on screen.
  - `useQuery` is a hook responsible for extracting query params from the current url.
- `FormInput` is a custom form input.
- `Spinner` is a simple loading animation.

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
