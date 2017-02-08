"use strict";

const Utils = require("./src/utils");
const TestRunnerBatched = require("./src/test-runner-batched");
const TestRunnerIterative = require("./src/test-runner-iterative");
const argv = require("yargs");

const DEFAULT_DELAY = 6500;
const DEFAULT_BATCH_SIZE = 500;

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
    .default("d", DEFAULT_DELAY)
    .describe("d", "The delay between each request")

    .alias("b", "batched")
    .boolean("b")
    .default("b", false)
    .describe("b", "If the aliases are sent in batches")

    .alias("s", "batchSize")
    .nargs("s", 1)
    .default("s", DEFAULT_BATCH_SIZE)
    .describe("s", "The amount of aliases for each batch")

    .check((argv, aliases) => {
        return !argv.delay || parseInt(argv.delay || parseInt(argv.batchSize));
    })

    .demandOption(["e", "a", "c"])
    .help("h")
    .alias("h", "help")
    .argv;

const testRunner = args.batched
    ? new TestRunnerBatched(args)
    : new TestRunnerIterative(args);

Utils.getAliasesFromCSV(args.csv, aliases => {
    testRunner.start(aliases)
});
