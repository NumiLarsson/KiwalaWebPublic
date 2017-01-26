# kiwala-web
Client side repo for the kiwala app


## Instructions

### Commands

#### NPM
npm start - Starts the development server and opens a browser window. Auto refreshes.
npm test  - Run tests and start an interactive test environment.
npm build - Create a production build

#### YARN
yarnpkg start - Starts the development server and opens a browser window. Auto refreshes.
yarnpkg test  - Run tests and start an interactive test environment.
yarnpkg build - Create a production build

#### Deployment
1. Prerequisite: Install firebase-tools
npm install -g firebase-tools 
yarn global add firebase-tools

2. execute the command: firebase deploy
   To only deploy new database rules use: firebase deploy --only database