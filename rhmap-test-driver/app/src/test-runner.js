"use strict";

const API = require("./rhmap-api");
const async = require("async");
const Utils = require("./utils");

class TestRunner {

    constructor(args) {
        // The helper that will handle all API requests.
        this.api = new API(args);
        // The ID of the application that owns the target aliases.
        this.appId = args.appId;
        // The time between one request and another
        this.delay = args.delay;
    }

    /**
     * Here's all the verification and common logic for start method.
     */
    start() {
        if (!this.api || !this.appId) {
            throw new Error("An endpoint URL and an application ID must be provided");
        }
    }
}

module.exports = TestRunner;
