"use strict";

const API = require("./ups-api");
const TestRunner = require("./test-runner");
const Message = require("../model/message");
const Options = require("../model/options");

class BatchTestRunner extends TestRunner {

    constructor(args) {
        super(args);
        this.app = {
            pushApplicationID: args.pushApplicationID,
            masterSecret: args.masterSecret
        };
    }

    start(aliases) {
        super.start();
        console.log(`[${this.app.pushApplicationID}] Sending message to all [${aliases.length}] aliases at the same time`);

        const messages = aliases.map(alias => {
            const message = new Message(`Hello ${alias}!`);
            const options = new Options();
            options.alias = alias;
            return { message, options };
        });

        this.API.sendNotificationsToApp(messages, this.app)
            .then(res => console.log(`[${this.app.pushApplicationID}] RESPONSE: ${JSON.stringify(res)}`))
            .catch(err => console.log(`[${this.app.pushApplicationID}] ERROR: ${err}`));
    }
}

module.exports = BatchTestRunner;
