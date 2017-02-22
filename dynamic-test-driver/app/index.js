"use strict";

const API = require("./src/ups-api");
const AppsTestRunner = require("./src/apps-test-runner");
const AliasTestRunner = require("./src/alias-test-runner");
const BatchTestRunner = require("./src/batch-test-runner");
const Utils = require("./src/utils");
const async = require("async");

const args = Utils.buildCommandLineParser();

const testRunners = [];
const testRunnerType = getTestRunnerType(args);

function getTestRunnerType(args) {
    if (args.together) {
        return BatchTestRunner;
    } else if (args.csv) {
        return AliasTestRunner;
    } else {
        return AppsTestRunner;
    }
}

for (let i = 0; i < args.instances; i++) {
    testRunners[i] = new testRunnerType(args);
}

if (testRunnerType === AliasTestRunner
    || testRunnerType === BatchTestRunner) {
    Utils.getAliasesFromCSV(args.csv)
        .then(aliases => {
            async.each(testRunners, testRunner => testRunner.start(aliases))
        });

} else {
    new API(args.endPoint)
        .getApplications(args.username, args.password)
        .then(apps => {
            async.each(testRunners, testRunner => testRunner.start(apps))
        });
}
