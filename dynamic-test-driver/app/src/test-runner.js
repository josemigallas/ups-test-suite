"use strict";

const Message = require("../model/message");
const Options = require("../model/options");

const DELAY = 1000;

class TestRunner {

    constructor(args) {
        this.message = new Message(`Testing!!`);
        this.options = new Options();
        this.delay = args.delay;
    }

    // Common logic
    start(apps) {
    }
}

module.exports = TestRunner;
