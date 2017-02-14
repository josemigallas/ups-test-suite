"use strict";

const API = require("./ups-api");
const Message = require("../model/message");
const Options = require("../model/options");
const Utils = require("./utils");

const DELAY = 1000;

class AppsTestRunner {

    static start(apps) {
        console.log(`Total apps: ${apps.length}`);

        const message = new Message(`Testing!!`);
        const options = new Options();

        const test = app => {
            API.sendNotificationToApp(message, app, options)
                .then(res => console.log(`RESPONSE: ${res}`))
                .catch(err => console.log(`ERROR: ${err.toString()}`))
        };

        Utils.forEachAsyncWithInterval(apps, test, DELAY);
    }
}

module.exports = AppsTestRunner;
