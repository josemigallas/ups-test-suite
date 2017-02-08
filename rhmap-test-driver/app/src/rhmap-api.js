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

    sendNotificationToAliases(appId, aliases) {
        const executor = (resolve, reject) => {
            const options = {
                uri: `${this.baseUrl}/push/${appId}`,
                body: JSON.stringify(aliases),
                headers: {
                    "content-type": "application/json"
                }
            }
            request.post(options, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        };

        return new Promise(executor);
    }
}

module.exports = API;