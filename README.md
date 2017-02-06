# kiwala-web
Client side repo for the kiwala app


## Instructions

### Commands

#### NPM
npm start - Starts the development server and opens a browser window. Auto refreshes.
npm test  - Run tests and start an interactive test environment.
npm build - Create a production build

#### YARN
```
yarnpkg start - Starts the development server and opens a browser window. Auto refreshes.
yarnpkg test  - Run tests and start an interactive test environment.
yarnpkg build - Create a production build
```

#### Deployment
1. Prerequisite: Install firebase-tools
```
npm install -g firebase-tools
``` 
or
```
yarn global add firebase-tools
```

2. execute the command: `firebase deploy`  
   To only deploy new database rules use: `firebase deploy --only database`
   
### Development

#### API
Kiwala uses a centralised API class to aggregate all interaction with our backend (currently Firebase). In order to use the API classes, instantiate a new instance, and then access the API component you need. For example:

```javascript
let api = new Api();
api.auth.login('john.doe@example.com', 'password')
   .then(user => {
     // use the login response, redirect for example
   }).catch(error => {
     // display an error about wrong credentials
   })
```

##### Creating a new API Component
Every domain concern of the application should have its own API class. It should be located in the `src/app` directory and have the following structure:

```javascript
import Example from '../models/Example'

export default ExampleApi {
  getExample(id) {
    // implementation
  }
}
```