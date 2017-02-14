"use strict";

const API = require("./ups-api");
<<<<<<< 55ec03c346c85de7553dd2da6b4ab6b60ec22919
const Utils = require("./utils");
const TestRunner = require("./test-runner");

class AppsTestRunner extends TestRunner {

    constructor(args) {
        super(args);
    }

    start(apps) {
        super.start();
        console.log(`Total apps: ${apps.length}`);

        const test = app => {
            console.log(`Sending message to all devices of "${app.name}" [${app.pushApplicationID}]`);
            this.API.sendNotificationToApp(this.message, app, this.options)
                .then(res => console.log(`[${app.pushApplicationID}] RESPONSE: ${JSON.stringify(res)}`))
                .catch(err => console.log(`[${app.pushApplicationID}] ERROR: ${err}`));
        };

        Utils.forEachAsyncWithInterval(apps, test, this.delay);
=======
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
>>>>>>> add csv functionality
    }
}

module.exports = AppsTestRunner;
