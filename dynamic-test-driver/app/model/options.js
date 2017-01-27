"use strict";

const DEFAULT_CRITERIA_ALIAS = ["TEST_TOKEN"]
const DEFAULT_CONFIG_TTL = -1;

class Options {
    constructor() {
        this.config = new Config();
        this.criteria = new Criteria();
    }
}

class Criteria {
    constructor() {
        this.alias = DEFAULT_CRITERIA_ALIAS;
        this.deviceType;
        this.categories;
        this.variants;
    }
}

class Config {
    constructor() {
        this.ttl = DEFAULT_CONFIG_TTL;
    }
}

module.exports = Options;
