# RHMAP Test Driver
This is a test-runner written in nodeJS that sends GET requests to a Cloud App endpoint, which internally uses $fh.push, in order to send a notification through the entire RHMAP system

#### Usage
Having NPM and nodeJS installed, first download all dependencies:
```
$ npm install
```
Then start the test-runner by running `node index.js` and passing, at least, `-e`, `a` and `c` arguments. To see usage instructions run `node index.js -h`:
```
Usage: node index.js [options]

Options:
  -e, --endPoint   The backend url                                    [required]
  -a, --appId      The ID of the application that owns the target aliases
                                                                      [required]
  -c, --csv        The path to the CSV path containing the aliases    [required]
  -d, --delay      The delay between each request                [default: 6500]
  -b, --batched    If the aliases are sent in batches [boolean] [default: false]
  -s, --batchSize  The amount of aliases for each batch           [default: 500]
  -h, --help       Show help                                           [boolean]

Examples:
  app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv
  app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv -d 100 -b -s 1000

```

