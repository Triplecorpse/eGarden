class Message {
    constructor(message) {
        this.header = message.header.toLowerCase();
        this.body = message.body;
        this.status = message.status.toLowerCase();
        this.success = message.status === 'success';
    }
}

module.exports = Message;