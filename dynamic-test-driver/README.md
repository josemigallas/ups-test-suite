# Dynamic Test Driver
This is a test-runner written in nodeJS that generate heavy loads on a standalone AeroGear-UPS instance by sending push notifications.

#### Stress test modes
The dynamic-test-driver has different ways to stress test the server, all using [unifiedpush-node-sender](https://www.npmjs.com/package/unifiedpush-node-sender). 

##### Single Alias for All Devices
This one is intented to reach all devices with a single request. It will get all apps from UPS using [unifiedpush-admin-client](https://www.npmjs.com/package/unifiedpush-admin-client) and send a notification to a test alias, `TEST_TOKEN`. Hence all devices must register with this alias.
This mode needs only a username and a password.

##### One Request, One Notification
This one is designed to reach a group of devices within an App, but one request at a time. The information about the devices must be stored in a CSV file and have 3 columns containing: variantID, alias and tokenID. By default they are `#VARIANT ID`,`TOKEN ALIAS`, `TOKEN ID`. 
This mode needs only a pushApplicationID, masterSecret and csv file path.

##### One Request, Many Notifications
This one aims so send many different notifications but with a single request. Each notification targets a different alias and has a custom message, but only one request to UPS. The information about the devices must be stored in a CSV as [above](#one-request,-one-notification).

#### Concurrency
Concurrency can be added by using the `-i` flag. This will instantiate more than one test-runner, which is like running the node app many times in different terminals.

#### Usage
Having [NPM and nodeJS installed](https://nodejs.org/), first download all dependencies:
```
$ npm install
```
Then start the test-runner by running `node index.js` and passing the necessary arguments. To see detailed usage instructions run `node index.js -h`:
```
Usage: node index.js [[user credentials] | [app credentials]] [options]

User credentials:
  -u, --username           Aerogear account username
  -p, --password           Aerogear account password

App credentials:
  -a, --pushApplicationID  The target applications' pushApplicationID
  -m, --masterSecret       The target applications' masterSecret
  -c, --csv                The path to the CSV path containing the aliases  

Options:
  -e, --endPoint           The UPS instance url                                                     [default: "http://localhost:8080/ag-push"]
  -d, --delay              The delay between each request                                           [default: 1000]
  -i, --instances          How many test runners will be instantiated simultaneously                [default: 1]
  -t, --together           Whether or not the messages are going to be sent using 'sendAll' method  [default: false]

  -h, --help               Show help                                                                

Examples:
  dynamic-test-driver/app/index.js -u admin -p 123
  dynamic-test-driver/app/index.js -u admin -p 123 -e http://localhost:8080/ag-push
  dynamic-test-driver/app/index.js -a 123abc456def -m secret -c ./devices.csv
  dynamic-test-driver/app/index.js -a 123abc456def -m secret -c ./devices.csv -d 2000 -i 10
```
