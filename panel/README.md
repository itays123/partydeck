# Partydeck's storage API & UI

This is a traditional `Node.js` server.

## Backend Routes

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

## Components & Hooks

- The `App` component is responsible for routing

### Authentication

- login
  - `Login` is the page responsible for login operations, containing a form.
  - `useLogin` is the hook responsible for fetching the login route of the server.
- profile
  - `Profile` is the page responsible for showing user's public games.
  - `useProfile` is responsible for fetching the user data.
  - `UserDetails` is the header component of the `Profile` page.
- register
  - `Register` is the page responsible for register operations, containing a form.
  - `useRegister` is the hook responsible for fetching the register route of the server.
- `AuthContextProvider`, `useAuthContext` are the component and hook responsible for using the `AuthContext`.
- `AuthOnly` is a component that displays its children only if the user is authenticated
- `CookieConfirm` is a prompt showed in the `Login` and `Register` pages.
- `useCheckEmail` is a validation hook for the email input field in the `Login` and `Register` pages.

### Game view/edit/create

- action
  - `Discard`, `Play`, `Remove`, `Save` are the action buttons displayed in the game pages.
- create
  - `CreateGame` is the page responsible for the create game form
  - `GameLanguageSelect` is the component responsible for editing the language
  - `GameNameForm` is the component responsible for naming a game.
  - `NewGamesOnly` is a component that only shows its children if the game is new.
  - `useCreateGame` is the component responsible for fetching the create game route.
- edit
  - `EditableCard` is the component responsible for displaying a card, and modifying/deleting it if editor.
  - `PrivatePublicToggle`
  - `DeckEditor` is a component that gets an editor object from the props and uses it.
  - `DeckEditorWrapper` is responsible for getting the editor object depending on the deck type and giving it to the deck editor
  - `EditorOnly` is a component that only shows its children if the game author id is the same as the user id.
  - `GameEditorContextProvider`, `useGameEditorContext` are the component and hook responsible for using the GameEditorContext.
  - `useDeckEditor` is responsible for saving the deck edited state in an efficient way and formatting it if needed. It is also responsible for tracking the user focus.
  - `useDeleteGame` is responsible for fetching the delete game route.
  - `useSaveGame` is responsible for fetching the update game route.
- view
  - `usePlayGame` is responsible for fetching the play route.
- `GameSettingsViewEdit` is responsible for editing the game settings, such as name, language, private state etc.
- `GameViewEdit` is the page responsible for viewing and editing existing games.
- `useGame` is responsible for editing existing games.

### Home

- `Home` is the default page.
- `MyGames` is the component shown to signed in users.
- `Welcome` is the component shown to unauthenticated users.

### shared components and hooks

- `GameList` is a component responsible for displaying a list of `GameItem`s
  - `GameItem` is a component that shows game data such as name, language, creator and number of cards.
  - `GameListContext`, `useAuthor` are responsible for storing a shared author in the profile and home page.
- Navigation: `NavWrapper` is a component responsible for setting the position of the `Navbar` on the screen
  - `Navbar` is the component responsible for showing the header of the application.
  - `NavigationButton`
  - `SignedInDialog` is the prompt opened when pressing the user photo in the `SignedInLinks`
  - `SignedInLinks`, `SignedOutLinks` are the links shown depending on the auth state.
- `Search` is the search input component that redirects to the `SearchResults` page, showing a `GameList`
  - `useQuery` is the hook responsible for extrenalizing the query out of the current url
  - `useSearch` is responsible for fetching the search route.
- `FormInput` is used in authentication prompts.
- `PageNotFound` is the fallback page.
- `Spinner` is a simple loading animation.
- `SvgWrapper` is a component responsible for wrapping svg paths.

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
