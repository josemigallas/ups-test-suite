# RHMAP Test Driver
This is a test-runner written in nodeJS that sends GET requests to a Cloud App endpoint, which internally uses $fh.push, in order to send a notification through the entire RHMAP system

#### Usage
Having NPM and nodeJS installed, first download all dependencies:
```
$ npm install
```
Then start the test-runner passing the necessary arguments:
```
$ node index.js <endpoint url> <appId> <path/to/devices.csv> <delay>
```
`endpoint url` -> URL to your backend cloud app.

`appId` -> The ID of the application that owns the devices.

`path/to/devices.csv` -> The path to the CSV file that has all tokens.

`delay` -> The time in ms that will separate each request to the endpoint.
