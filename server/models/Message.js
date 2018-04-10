class Message {
    constructor(message) {
        this.header = message.header;
        this.body = message.body;
        this.status = message.status;
        this.success = message.status === 'success';
    }
}

module.exports = Message;