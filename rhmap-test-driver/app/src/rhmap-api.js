"use strict";

const request = require("request");

class API {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    sendNotificationToAlias(appId, alias) {
        return request.get(`${this.baseUrl}/push/${appId}/${alias}`);
    }
}

module.exports = API;