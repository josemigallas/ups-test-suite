"use strict";

const API = require("./ups-api");
<<<<<<< 13e032425790883f8ee458e77630d40a0a97c0a2
<<<<<<< 55ec03c346c85de7553dd2da6b4ab6b60ec22919
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
=======
const Message = require("../model/message");
const Options = require("../model/options");
=======
>>>>>>> refactor
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
>>>>>>> add csv functionality
    }
}

module.exports = AliasTestRunner;
