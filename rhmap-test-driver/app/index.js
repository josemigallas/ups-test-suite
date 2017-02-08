"use strict";

const Utils = require("./src/utils");
const TestRunnerBatched = require("./src/test-runner-batched");
const TestRunnerIterative = require("./src/test-runner-iterative");
const argv = require("yargs");
const async = require("async");

const DEFAULT_DELAY = 6500;
const DEFAULT_BATCH_SIZE = 500;
const DEFAULT_INSTANCES = 1;

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

    .alias("i", "instances")
    .nargs("i", 1)
    .default("i", DEFAULT_INSTANCES)
    .describe("i", "How many test runners will be instantiated simultaneously")

    .check((argv, aliases) => {
        return !argv.delay || parseInt(argv.delay) || parseInt(argv.batchSize) || parseInt(argv.instances);
    })

    .demandOption(["e", "a", "c"])
    .help("h")
    .alias("h", "help")
    .argv;

const testRunners = [];
const testRunnerType = args.batched
    ? TestRunnerBatched
    : TestRunnerIterative;

for (let i = 0; i < args.instances; i++) {
    testRunners[i] = new testRunnerType(args);
}

Utils.getAliasesFromCSV(args.csv, aliases => {
    async.each(
        testRunners,
        testRunner => testRunner.start(aliases),
        err => console.log(err)
    );
});
