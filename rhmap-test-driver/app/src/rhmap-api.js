"use strict";

const request = require("request");

class API {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    sendNotificationToAlias(appId, alias) {
        const executor = (resolve, reject) => {
            request.get(`${this.baseUrl}/push/${appId}/${alias}`, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        };

        return new Promise(executor);
    }
}

module.exports = API;