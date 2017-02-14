"use strict";

const API = require("./src/ups-api");
const AppsTestRunner = require("./src/apps-test-runner");
const AliasTestRunner = require("./src/alias-test-runner");
const argv = require("yargs");
const Utils = require("./src/utils");
const async = require("async");

const DEFAULT_DELAY = 1000;
const DEFAULT_INSTANCES = 1;

const args = argv
    .usage("Usage: node index.js [[user credentials] | [app credentials]] [options]")
    .example("$0 -u admin -p 123", "")
    .example("$0 -a 123abc456def -m secret -c ./devices.csv", "")
    .example("$0 -a 123abc456def -m secret -c ./devices.csv -d 2000 -i 10", "")

    .alias("u", "username")
    .nargs("u", 1)
    .describe("u", "Aerogear account username")

    .alias("p", "password")
    .nargs("p", 1)
    .describe("p", "Aerogear account password")

    .alias("a", "pushApplicationID")
    .nargs("a", 1)
    .describe("a", "The target applications' pushApplicationID")

    .alias("m", "masterSecret")
    .nargs("m", 1)
    .describe("m", "The target applications' masterSecret")

    .alias("c", "csv")
    .nargs("c", 1)
    .describe("c", "The path to the CSV path containing the aliases")

    .alias("d", "delay")
    .nargs("d", 1)
    .default("d", DEFAULT_DELAY)
    .describe("d", "The delay between each request")

    .alias("i", "instances")
    .nargs("i", 1)
    .default("i", DEFAULT_INSTANCES)
    .describe("i", "How many test runners will be instantiated simultaneously")

    .check((args, aliases) => {
        if (!parseInt(args.delay) || !parseInt(args.instances)) {
            return false;
        }

        if (args.username && args.password) {
            // User credentials -> send push to all apps
            // Don't specify also appId, masterSecret or CSV
            return !args.pushApplicationID && !args.masterSecret && !args.csv;
        }

        if (args.pushApplicationID && args.masterSecret && args.csv) {
            // App credentials -> send push to a list of devices of 1 app
            // Don't specify also username or password
            return !args.username && !args.password;
        }

        return false;
    })

    .help("h")
    .alias("h", "help")
    .argv;

const testRunners = [];
const testRunnerType = args.csv
    ? AliasTestRunner
    : AppsTestRunner;

for (let i = 0; i < args.instances; i++) {
    testRunners[i] = new testRunnerType(args);
}

if (args.csv) {
    Utils.getAliasesFromCSV(args.csv)
        .then(aliases => {
            async.each(testRunners, testRunner => testRunner.start(aliases))
        });

} else {
    API.getApplications(username, password)
        .then(apps => {
            async.each(testRunners, testRunner => testRunner.start(apps))
        });
}
