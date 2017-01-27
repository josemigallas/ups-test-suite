"use strict";

const DEFAULT_MESSAGE_SOUND = "default";
const DEFAULT_MESSAGE_PRIORITY = "normal";
const DEFAULT_MESSAGE_SIMPLE_PUSH = "version=1485353624158";

class Message {
    constructor(alert) {
        this.alert = alert;
        this.priority = DEFAULT_MESSAGE_PRIORITY;
        this.sound = DEFAULT_MESSAGE_SOUND;
        this.badge;
        this.simplePush;
        this.userData;
        this.apns;
        this.windows;
    }
}

module.exports = Message;