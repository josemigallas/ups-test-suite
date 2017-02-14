"use strict";

const API = require("./ups-api");
const Utils = require("./utils");
const TestRunner = require("./test-runner");

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
            console.log(`Sending message to 1 alias [${alias}]`);
            this.API.sendNotificationToApp(this.message, this.app, this.options)
                .then(res => console.log(`[${alias}] RESPONSE: ${JSON.stringify(res)}`))
                .catch(err => console.log(`[${alias}] ERROR: ${err}`));
        };

        Utils.forEachAsyncWithInterval(aliases, test, this.delay);
    }
}

module.exports = AliasTestRunner;
