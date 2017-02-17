"use strict";

const Utils = require("./src/utils");
const TestRunnerBatched = require("./src/test-runner-batched");
const TestRunnerIterative = require("./src/test-runner-iterative");
const TestRunnerTogether = require("./src/test-runner-together");
const async = require("async");

const args = Utils.buildCommandLineParser();

const testRunnerType = getTestRunnerType(args);

function getTestRunnerType(args) {
    if (args.together) {
        return TestRunnerTogether;
    } else if (args.batched) {
        return TestRunnerBatched;
    } else {
        return TestRunnerIterative;
    }
}

const testRunners = [];

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
