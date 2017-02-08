"use strict";

const TestRunner = require("./test-runner");
const API = require("./rhmap-api");
const async = require("async");
const Utils = require("./utils");

class TestRunnerBatched extends TestRunner {

    constructor(args) {
        super(args);
        // The amount of aliases to send each time
        this.batchSize = args.batchSize
    }

    /**
     * It sends a request to the backend endpoint for a batch of aliases with a fix delay in between
     */
    start(aliases) {
        super.start();

        const batches = this.splitAliasesInBatches(aliases);

        const startTime = Date.now();

        Utils.forEachAsyncWithInterval(batches, batch => {
            console.log(`Sending notification to ${batch.length} aliases at ${Date.now() - startTime}`);
            this.api.sendNotificationToAliases(this.appId, batch)
                .then(res => console.log(`RESPONSE: ${res.statusCode} - ${res.body}`))
                .catch(err => console.log(`ERROR: ${err}`));
        }, this.delay);
    }

    splitAliasesInBatches(aliases) {
        const totalBatches = Math.ceil(aliases.length / this.batchSize);
        const batches = [totalBatches];
        for (let i = 0; i < totalBatches; i++) {
            batches[i] = aliases.splice(0, this.batchSize);
        }
        return batches;
    }
}

module.exports = TestRunnerBatched;
