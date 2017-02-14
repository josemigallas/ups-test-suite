"use strict";

const Message = require("../model/message");
const Options = require("../model/options");
<<<<<<< 13e032425790883f8ee458e77630d40a0a97c0a2
const API = require("./ups-api");
=======
>>>>>>> refactor

const DELAY = 1000;

class TestRunner {

    constructor(args) {
        this.message = new Message(`Testing!!`);
        this.options = new Options();
<<<<<<< 13e032425790883f8ee458e77630d40a0a97c0a2
        this.delay = args.delay;
        this.API = new API(args.endPoint);
=======
>>>>>>> refactor
    }

    // Common logic
    start(apps) {
    }
}

module.exports = TestRunner;
