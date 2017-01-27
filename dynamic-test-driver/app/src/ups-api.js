"use strict";

const adminClient = require("unifiedpush-admin-client");
const senderClient = require("unifiedpush-node-sender");

const BASE_URL = "http://localhost:8080/ag-push";

class API {

    /**
     * Returns the list of applications
     * @argument {string} username Account's username for authentication
     * @argument {string} password Account's password for authentication
     * @returns {Promise} A promise containing all the applications in user's account.
     */
    static getApplications(username, password) {
        const settings = {
            username,
            password
        };

        return adminClient(BASE_URL, settings)
            .then(client => client.applications.find());
    }

    /**
     * Sends a push notification to an application
     * @argument {Message} message An instance of Message class containing all information.
     * @argument {Application} app The application that will be target of the notification
     * @argument {Options} options An instance of Options class containing some optional parameters.
     * @returns {Promise} An empty promise if the notification was sent.
     */
    static sendNotificationToApp(message, app, options) {
        console.log(`Sending message to "${app.name}" {${app.pushApplicationID}}`)

        const settings = {
            url: BASE_URL,
            applicationId: app.pushApplicationID,
            masterSecret: app.masterSecret
        }

        return senderClient(settings)
            .then(client => client.sender.send(message, options))
    }
}

module.exports = API;
