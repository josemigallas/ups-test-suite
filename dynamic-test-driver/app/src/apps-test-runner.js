"use strict";

const API = require("./ups-api");
const Utils = require("./utils");
const TestRunner = require("./test-runner");

const DELAY = 1000;

class AppsTestRunner extends TestRunner {

    constructor(args) {
        super(args);
    }

    start(apps) {
        super.start();
        console.log(`Total apps: ${apps.length}`);

        const test = app => {
            API.sendNotificationToApp(this.message, app, this.options)
                .then(res => console.log(`RESPONSE: ${res}`))
                .catch(err => console.log(`ERROR: ${err.toString()}`))
        };

        Utils.forEachAsyncWithInterval(apps, test, this.delay);
    }
}

module.exports = AppsTestRunner;
