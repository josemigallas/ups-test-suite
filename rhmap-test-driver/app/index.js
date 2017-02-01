"use strict";

const Utils = require("./src/utils");
const TestRunner = require("./src/test-runner");
const argv = require("yargs");

const DEFAULT_DELAY = 6500;

let args = argv
    .usage("Usage: node index.js [options]")
    .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -d 5000", "")

    .alias("e", "endPoint")
    .nargs("e", 1)
    .describe("e", "The backend url")

    .alias("a", "appId")
    .nargs("a", 1)
    .describe("a", "The ID of the application that owns the target aliases")

    .alias("c", "csv")
    .nargs("c", 1)
    .describe("c", "The path to the CSV path containing the aliases")

    .alias("d", "delay")
    .nargs("d", 1)
    .describe("d", "The delay between each request")
    
    .check((argv, aliases) => {
        return !argv.delay || parseInt(argv.delay);
    })

    .demandOption(["e", "a", "c"])
    .help("h")
    .alias("h", "help")
    .argv;

const testRunner = new TestRunner();
testRunner.endPoint = args.endPoint;
testRunner.appId = args.appId;
testRunner.delay = args.delay || DEFAULT_DELAY;

Utils.getAliasesFromCSV(args.csv, aliases => testRunner.start(aliases));
