"use strict";

const API = require("./rhmap-api");
const TestRunner = require("./test-runner");

class TestRunnerTogether extends TestRunner {

    constructor(args) {
        super(args);
    }

    /**
    * It sends a request to the backend endpoint for a batch of aliases with a fix delay in between
    */
    start(aliases) {
        super.start();

        console.log(`Sending notification to ${aliases.length} aliases in a single batch`);
        this.api.sendNotificationToAliasesInBatch(this.appId, aliases)
            .then(res => console.log(`RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
            .catch(err => console.log(`ERROR: ${err}`));
    }
}

module.exports = TestRunnerTogether;
