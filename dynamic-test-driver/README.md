# Dynamic Test Driver
This is a test-runner written in nodeJS that sends a push notification to all applications of a user.

#### Usage
Having NPM and nodeJS installed, first download all dependencies:
```
$ npm install
```
Then start the test-runner passing your credentials as arguments:
```
$ node app/index.js <username> <password>
```
The test-runner will retrieve all the apps and iterate over them with a delay of 1000ms, sending a notification to all their tokens.