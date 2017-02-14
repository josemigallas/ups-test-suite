"use strict";

const API = require("./src/ups-api");
const AppsTestRunner = require("./src/apps-test-runner");
const AliasTestRunner = require("./src/alias-test-runner");
const argv = require("yargs");
const Utils = require("./src/utils");

const DEFAULT_DELAY = 6500;
const DEFAULT_BATCH_SIZE = 500;
const DEFAULT_INSTANCES = 1;

const args = argv
    .usage("Usage: node index.js [[user credentials] | [app credentials]] [options]")
    .example("$0 -u admin -p 123", "")
    .example("$0 -a 123abc456def -m secret -c ./devices.csv", "")

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

    // .alias("d", "delay")
    // .nargs("d", 1)
    // .default("d", DEFAULT_DELAY)
    // .describe("d", "The delay between each request")

    // .alias("b", "batched")
    // .boolean("b")
    // .default("b", false)
    // .describe("b", "If the aliases are sent in batches")

    // .alias("s", "batchSize")
    // .nargs("s", 1)
    // .default("s", DEFAULT_BATCH_SIZE)
    // .describe("s", "The amount of aliases for each batch")

    // .alias("i", "instances")
    // .nargs("i", 1)
    // .default("i", DEFAULT_INSTANCES)
    // .describe("i", "How many test runners will be instantiated simultaneously")

    .check((args, aliases) => {
        if (args.username && args.password) {
            // User credentials -> send push to all apps
            // Should not be either pushApplicationID or masterSecret
            return !args.pushApplicationID && !args.masterSecret;
        }

        if (args.pushApplicationID && args.masterSecret) {
            // App credentials -> send push to 1 single app
            // Should not be username or password
            return !args.username && !args.password;
        }

        return false;
    })

    .help("h")
    .alias("h", "help")
    .argv;

if (args.username && args.password) {
    API.getApplications(username, password)
        .then(AppsTestRunner.start)

} else {
    if (args.csv) {
        Utils.getAliasesFromCSV(args.csv, aliases => AliasTestRunner.start(args, aliases));

    } else {
        const apps = [{
            pushApplicationID: args.pushApplicationID,
            masterSecret: args.masterSecret
        }];

        AppsTestRunner.start(apps);
    }
}


