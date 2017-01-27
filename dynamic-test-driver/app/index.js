"use strict";

const API = require("./src/ups-api");
const TestRunner = require("./src/test-runner");

// Take the necessary command line arguments.
const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
    console.log("usage: node index.js <username> <password>");
    process.exit(1);
}

API.getApplications(username, password)
    .then(TestRunner.start)
