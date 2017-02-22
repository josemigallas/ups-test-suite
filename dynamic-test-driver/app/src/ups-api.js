"use strict";

const adminClient = require("unifiedpush-admin-client");
const senderClient = require("unifiedpush-node-sender");

class API {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    /**
     * Returns the list of applications
     * @argument {string} username Account's username for authentication
     * @argument {string} password Account's password for authentication
     * @returns {Promise} A promise containing all the applications in user's account.
     */
    getApplications(username, password) {
        const settings = {
            username,
            password
        };

        return adminClient(this.endpoint, settings)
            .then(client => client.applications.find());
    }

    /**
     * Sends a push notification to an application
     * @argument {Message} message An instance of Message class containing all information.
     * @argument {Application} app The application that will be target of the notification
     * @argument {Options} options An instance of Options class containing some optional parameters.
     * @returns {Promise} An empty promise if the notification was sent.
     */
    sendNotificationToApp(message, app, options) {
        const settings = {
            url: this.endpoint,
            applicationId: app.pushApplicationID,
            masterSecret: app.masterSecret
        }

        return senderClient(settings)
            .then(client => client.sender.send(message, options));
    }

    /**
    * Sends a push notification to an application
    * @argument {Array} messages An array of objects containing both Message and Options: {Message, Options}
    * @argument {Message} message An instance of Message class containing all information.
    * @argument {Options} options An instance of Options class containing some optional parameters.
    * @argument {Application} app The application that will be target of the notification
    * @returns {Promise} An empty promise if the notification was sent.
    */
    sendNotificationsToApp(messages, app) {
        const settings = {
            url: this.endpoint,
            applicationId: app.pushApplicationID,
            masterSecret: app.masterSecret
        }

        return senderClient(settings)
            .then(client => client.sender.sendBatch(messages));
    }
}

module.exports = API;
