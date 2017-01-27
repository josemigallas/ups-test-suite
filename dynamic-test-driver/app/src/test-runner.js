"use strict";

const API = require("./ups-api");
const Message = require("../model/message");
const Options = require("../model/options");

const DELAY = 1000;

class TestRunner {

    static start(apps) {
        console.log(`Total apps: ${apps.length}`);

        const message = new Message(`Testing!!`);
        const options = new Options();

        apps.forEach((app, i) => {
            setTimeout(() => {
                API.sendNotificationToApp(message, app, options)
            }, 1000 * i);
        });
    }
}

module.exports = TestRunner;
