"use strict";

const API = require("./ups-api");
const Utils = require("./utils");
const TestRunner = require("./test-runner");

const DELAY = 1000;

class AliasTestRunner extends TestRunner {

    constructor(args) {
        super(args);
        this.app = {
            pushApplicationID: args.pushApplicationID,
            masterSecret: args.masterSecret
        };
    }

    start(aliases) {
        super.start();
        console.log(`Total devices: ${aliases.length}`);

        const test = alias => {
            this.options.alias = alias;
            API.sendNotificationToApp(this.message, this.app, this.options)
                .then(res => console.log(`RESPONSE: ${JSON.stringify(res)}`))
                .catch(err => console.log(`ERROR: ${err.toString()}`))
        };

        Utils.forEachAsyncWithInterval(aliases, test, DELAY);
    }
}

module.exports = AliasTestRunner;
