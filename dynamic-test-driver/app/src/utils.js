"use strict";

const csv = require("fast-csv");
const fs = require("fs");
const argv = require("yargs");

const DEFAULT_DELAY = 1000;
const DEFAULT_INSTANCES = 1;
const DEFAULT_ENDPOINT = "http://localhost:8080/ag-push";

const COLUMN_NAME_ALIAS = "TOKEN ALIAS";

function getAliasesFromCSV(csvPath, callback) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(csvPath);
        const options = {
            // headers: ["variantId", "alias", "token"]
            headers: true
        }
        const aliases = [];
        const csvStream = csv
            .parse(options)
            .on("data", row => aliases.push(row[COLUMN_NAME_ALIAS]))
            .on("end", () => resolve(aliases));

        stream.pipe(csvStream);
    });
}

function forEachAsyncWithInterval(collection, func, delay) {
    collection.forEach((item, i) => {
        setTimeout(() => {
            func(item);
        }, delay * i);
    });
}

function buildCommandLineParser() {
    return argv
        .usage("Usage: node index.js [[user credentials] | [app credentials]] [options]")
        .example("$0 -u admin -p 123", "")
        .example("$0 -u admin -p 123 -e http://localhost:8080/ag-push", "")
        .example("$0 -a 123abc456def -m secret -c ./devices.csv", "")
        .example("$0 -a 123abc456def -m secret -c ./devices.csv -d 2000 -i 10", "")

        .alias("u", "username")
        .nargs("u", 1)
        .describe("u", "Aerogear account username")

        .alias("p", "password")
        .nargs("p", 1)
        .describe("p", "Aerogear account password")

        .alias("e", "endPoint")
        .nargs("e", 1)
        .default("e", DEFAULT_ENDPOINT)
        .describe("e", "The UPS instance url")

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

        .alias("t", "together")
        .boolean("t")
        .default("t", false)
        .describe("t", "Whether or not the messages are going to be sent using 'sendAll' method")

        .check((args, aliases) => {
            if (!parseInt(args.delay) || !parseInt(args.instances)) {
                return false;
            }

            if (args.username && args.password) {
                // User credentials -> send push to all apps
                // Don't specify also appId, masterSecret or CSV
                // Cannot send together either since there are no aliases
                return !args.pushApplicationID && !args.masterSecret && !args.csv && !args.together;
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
}

module.exports = {
    buildCommandLineParser,
    getAliasesFromCSV,
    forEachAsyncWithInterval
}
