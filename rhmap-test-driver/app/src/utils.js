"use strict";

const csv = require("fast-csv");
const fs = require("fs");
const argv = require("yargs");

const COLUMN_NAME_ALIAS = "TOKEN ALIAS";

const DEFAULT_DELAY = 6500;
const DEFAULT_BATCH_SIZE = 500;
const DEFAULT_INSTANCES = 1;

function getAliasesFromCSV(csvPath, callback) {
    const stream = fs.createReadStream(csvPath);
    const options = {
        // headers: ["variantId", "alias", "token"]
        headers: true
    }
    const aliases = [];
    const csvStream = csv
        .parse(options)
        .on("data", row => aliases.push(row[COLUMN_NAME_ALIAS]))
        .on("end", () => callback(aliases));

    stream.pipe(csvStream);
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
        .usage("Usage: node index.js [options]")
        .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -d 5000", "")
        .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -t -p myappid123 -m secret123", "")
        .example("$0 -e http://example.com/backend -a asdf12134 -c ./devices.csv -b -s 100 -p myappid123 -m secret123", "")

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

        .alias("D", "direct")
        .boolean("D")
        .default("D", false)
        .describe("D", "Wether the UPS Sender API will be use (true) or the fh.push SDK (false)")

        .alias("p", "pushApplicationID")
        .nargs("p", 1)
        .describe("p", "App's pushApplicationID, needed to use the UPS Sender API.")

        .alias("m", "masterSecret")
        .nargs("m", 1)
        .describe("m", "App's masterSecret, needed to use the UPS Sender API.")

        .alias("t", "together")
        .boolean("t")
        .default("t", false)
        .describe("t", "Whether or not the aliases will be sent via the 'batch' endpoint")

        .check((argv, aliases) => {
            return !argv.delay || parseInt(argv.delay) || parseInt(argv.batchSize) || parseInt(argv.instances)
                || (argv.direct && !argv.pushApplicationID || !argv.masterSecret)
                || (argv.batched && argv.together);
        })

        .demandOption(["e", "a", "c"])
        .help("h")
        .alias("h", "help")
        .argv;
}

module.exports = {
    getAliasesFromCSV,
    forEachAsyncWithInterval,
    buildCommandLineParser
}
