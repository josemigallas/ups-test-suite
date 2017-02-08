# RHMAP Test Driver
This is a test-runner written in nodeJS that sends GET requests to a Cloud App endpoint, which internally uses $fh.push, in order to send a notification through the entire RHMAP system.

![funny_dog](https://camo.githubusercontent.com/67788c5031750b707cf2ef584f7f466eb403161b/68747470733a2f2f63646e302e766f782d63646e2e636f6d2f7468756d626f722f5f4a49364d676547516665374278563166704c30434270443277303d2f3678303a383935783530302f31363030783930302f63646e302e766f782d63646e2e636f6d2f75706c6f6164732f63686f7275735f696d6167652f696d6167652f34393439333939332f746869732d69732d66696e652e302e6a7067)

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
