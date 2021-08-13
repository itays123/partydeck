# Partydeck's storage API & UI

This is a traditional `Node.js` server.

## Backend Routes

### Public Routes

- `GET` **`/api/search`**: Searches for public games.
- `GET` **`/api/play/:gameId`**: Generates a `playable` game and sends it to the live server.
- `GET` **`/api/:user`**: Gets all user public games.

### Game Routes

- `GET` **`/api/game`**: Returns all games of a user
- `POST` **`/api/game`**: Creates a new game.
- `GET` **`/api/game/:id`**: Returns a game (if game is public or requested by author).
- `PUT` **`/api/game/:id`**: Updates a game.
- `DELETE` **`/api/game/:id`**: Deletes a game.

### Auth Routes

- `POST` **`/api/auth/login`**: Basic email-password login.
- `POST` **`/api/auth/register`**: Creates a new user.
- `GET` **`/api/auth/check`** checks if email is in use.

## Architecture

### Authentication

The authentication folder consists of 3 hooks that can be used to get auth data:

- `useLogin`
- `useRegister`
- `useProfile` - for getting user data

Apart from that, it provides a highly-composable, super customizeable authentication form utilities that are being used in the `LoginModal` and `RegisterModal`.
The folder consists of:

- My context logical warppers and context actions that [broke the internet](https://dev.to/itays123/using-the-react-context-api-the-right-way-a-time-saver-5c3f)
- super resuable form inputs
- validation tools

Combined toghether, the two folders are used in the `AuthContext` provider file, in the `AuthProtectedPage` and in the login and register modals.

### Game view/edit/create

This folder consists of all the UI related to storing decks and using them.

In the `action` folder, all files that are related to CRUD operations can be found.

- For existing games, The `GameCrudProvider` component is used, providing easy acess to the save and delete methods in the `useSaveGame` and `useDeleteGame`.
- New games have a similar functionality with the `NewGameSaveProvider` and the `useCreateGame` hook.
- Existing games also have use the `SaveGameOnChange` hook. In the file, you can find a `RefreshableGameEditorProvider`, as well as the hook. The hook uses the `HardIsChanged` hook, a component that returns true if the game has unsaved changes for more than 1.5 seconds.

It also provides an intergartion with the live server to compose a live game from a given deck. In the `play` folder, you can see all of the live-game integration files:

- The provider, responsible for the logic behind the scenes
- The modal, providing feedback when a user pressed `play`
- The hook, fetching the server.

The deck editing UI is well developed and structured, and it uses the `EditableCard` component with `framer-motion` to create an animated deck of cards. The core of this folder is the `useDeck` hook, that tracks the changes made to a deck and easily edits it in real time.

For customizing other game data, the `settings` folder is made. Its capabilities:

- customizing a game name
- toggling game visibility
- toggling game language

Combining the four of those will create a huge, unreadable component. Because of that, the `layout` folder is created, containing independent part of the game view edit and the game create page that can be reused. It consists of:

- The game ready wrapper, that displays a loader of the game is loading
- The game header, containing the name and the actions
- The game settings bar, containing the settings
- The deck editors section, providing focus utilities

If you read the contents of this folder, you can picture exacly what the page looks like. These layout components are used in the `CreateGame` and `GameViewEdit` components.

### Home, about, library pages

Apart from the game editor pages and the authentication modals, there are other pages to the application:

- The home page
- The about (`/about`), cookie & data policy (`/about/privacy`) and creating decks guide (`/about/decks`).
- The game library page (`/search`) and the search results page.
- The auth-protected page containing the user's decks (`/my`)
- The page not found page.

### Components

The components folder consists of small, reusable components of my UI, containing the following:

- brand resources, github-related resources, glyphs and icons.
- form utilities
- modal utilities
- The `NavigationBar` and `Footer` components
- The `GameList` component, shown in the search results and my decks page
- A simple spinner
- A search bar
- The `SideProfileBar` component, used in the game library pages.
- My context warppers and actions that broke the internet

### Helpers

This folder is made for non-componentable code that is used anywhere on the app, containing:

- The live game website link, imported from the environment.
- The languages object, that maps the language code (i.e: 'en') to the language name.
- The `useClickOutside` hook
- The `useDebounce` and `useDebouncedValue` hook
- The `useFetch` hook

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
