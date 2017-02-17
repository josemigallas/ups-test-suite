"use strict";

const request = require("request");

const PUSH_ROUTE_FHPUSH = "push";
const PUSH_ROUTE_UPS_API = "push-ups";

class API {

    constructor(args) {
        this.setEndPoint(args.endPoint);
        this.setDirect(args.direct);
        if (args.direct) {
            this.pushApplicationID = args.pushApplicationID;
            this.masterSecret = args.masterSecret;
        }
    }

    setEndPoint(endPoint) {
        this.endPoint = endPoint.lastIndexOf('/') === endPoint.length - 1
            ? endPoint.slice(0, -1)
            : endPoint;
    }

    setDirect(direct) {
        this.pushRoute = direct
            ? PUSH_ROUTE_UPS_API
            : PUSH_ROUTE_FHPUSH;
    }

    sendNotificationToAlias(appId, alias) {
        return new Promise((resolve, reject) => {
            const url = `${this.endPoint}/${this.pushRoute}/${appId}/${alias}?user=${this.pushApplicationID}&pass=${this.masterSecret}`;
            request
                .get(url, (err, res) => err ? reject(err) : resolve(res));
        });
    }

    sendNotificationToAliases(appId, aliases) {
        return new Promise((resolve, reject) => {
            const url = `${this.endPoint}/${this.pushRoute}/${appId}?user=${this.pushApplicationID}&pass=${this.masterSecret}`;
            request
                .post(url, (err, res) => err ? reject(err) : resolve(res))
                .json(aliases);
        });
    }

    sendNotificationToAliasesInBatch(appId, aliases) {
        return new Promise((resolve, reject) => {
            const url = `${this.endPoint}/${this.pushRoute}/${appId}/batch?user=${this.pushApplicationID}&pass=${this.masterSecret}`;
            request
                .post(url, (err, res) => err ? reject(err) : resolve(res))
                .json(aliases);
        });
    }
}

module.exports = API;