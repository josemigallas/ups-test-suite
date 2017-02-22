# RHMAP Test Driver
This is a test-runner written in nodeJS that generate heavy loads on a RHMAP Push instance by sending push notifications. It attacks [an HTTP endpoint](https://github.com/josemigallas/rhmap-test-cloud-app) hosted in some RHMAP project that will internally send the necessary requests through the entire platform.

#### Stress test modes
Originally, the Cloud App would only use the RHMAP push SDK, `$fh.push`, in order to send a notification through the entire RHMAP system, however now it is also possible to send the notifications using the AeroGear RestAPI. For this usage, all "UPS API specific" arguments must be provided.

#### Concurrency
Concurrency can be added in two ways. By using the `-i` flag, it will instantiate more than one test-runner, which is like running the node app many times in different terminals. By adding the `-b` flag, a group of aliases will be sent together and the cloud app will handle them simultaneously using [Async](https://www.npmjs.com/package/async).

#### Usage
Having [NPM and nodeJS installed](https://nodejs.org/), first download all dependencies:
```
$ npm install
```
Then start the test-runner by running `node index.js` and passing the necessary arguments. To see detailed usage instructions run `node index.js -h`:
```
Usage: node index.js [Required] [UPS API specific] [options]

Required:
  -e, --endPoint           The backend url
  -a, --appId              The ID of the application that owns the target aliases
  -c, --csv                The path to the CSV path containing the aliases

UPS API specific:    
  -p, --pushApplicationID  App's pushApplicationID, needed to use the UPS SenderAPI.
  -m, --masterSecret       App's masterSecret, needed to use the UPS Sender API.
  -D, --direct             Wether the UPS Sender API will be use (true) or the fh.push SDK (false)  [boolean] [default: false]

Options:
  -d, --delay              The delay between each request                                           [default: 6500]
  -b, --batched            If the aliases are sent in batches                                       [boolean] [default: false]
  -s, --batchSize          The amount of aliases for each batch                                     [default: 500]
  -i, --instances          How many test runners will be instantiated simultaneously                [default: 1]

  -h, --help               Show help

Examples:
  app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv
  app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv -d 100 -b -s 1000
  app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv -D -p pushIDabcd123 -m secret123

```

