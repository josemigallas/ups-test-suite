"use strict";

const API = require("./ups-api");
const Message = require("../model/message");
const Options = require("../model/options");
const Utils = require("./utils");

const DELAY = 1000;

class AliasTestRunner {

    static start(app, aliases) {
        console.log(`Total devices: ${aliases.length}`);

        const message = new Message(`Testing!!`);
        const options = new Options();

        const test = alias => {
            options.alias = alias;
            API.sendNotificationToApp(message, app, options)
                .then(res => console.log(`RESPONSE: ${JSON.stringify(res)}`))
                .catch(err => console.log(`ERROR: ${err.toString()}`))
        };

        Utils.forEachAsyncWithInterval(aliases, test, DELAY);
    }
}

module.exports = AliasTestRunner;
