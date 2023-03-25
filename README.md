# Yelp Demo Frontend

This is a simple React app that demonstrates how to use the Yelp API to search for businesses based on a user's location and search term.

## Installation

To install the app, run the following command: yarn install

This will install all the necessary dependencies.

## Running the App

To run the app in development mode, use the following command: yarn run dev

This will start the app on `http://localhost:3000` and open a browser window. The app will automatically reload whenever you make changes to the code.

To run the tests, use the following command: yarn run test

To build the app for production, use the following command: yarn run build

This will create a production-ready build of the app in the `dist/` directory.

## Scripts

The following scripts are available in the `package.json` file:

- `dev`: Starts the app in development mode using Vite.
- `test`: Runs the Jest tests in the `__tests__` directory.
- `build`: Builds the app for production using TypeScript and Vite.
- `preview`: Starts a local server to preview the production build of the app.

```json
{
  "scripts": {
    "dev": "vite",
    "test": "jest",
    "build": "tsc -p tsconfig.node.json && vite build",
    "preview": "vite preview"
  }
}
```
