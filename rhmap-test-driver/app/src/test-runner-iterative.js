"use strict";

const TestRunner = require("./test-runner");
const API = require("./rhmap-api");
const async = require("async");
const Utils = require("./utils");

class TestRunnerIterative extends TestRunner {

    constructor(args) {
        super(args);
    }

    /**
     * It sends a request to the backend endpoint for each alias with a fix delay between each one
     */
    start(aliases) {
        super.start();

        const startTime = Date.now();

        Utils.forEachAsyncWithInterval(aliases, alias => {
            console.log(`Sending notification to ${alias} at ${Date.now() - startTime}`);
            this.api.sendNotificationToAlias(this.appId, alias)
                .then(res => console.log(`[${alias}] RESPONSE: ${res.statusCode} - ${res.body.error || res.body}`))
                .catch(err => console.log(`[${alias}] ERROR: ${err}`));
        }, this.delay);
    }
}

module.exports = TestRunnerIterative;
