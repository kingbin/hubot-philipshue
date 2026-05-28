const { EventEmitter } = require('node:events');

class TestAdapter extends EventEmitter {
  constructor(robot) {
    super();
    this.robot = robot;
  }

  async send(envelope, ...strings) {
    this.emit('send', envelope, strings);
  }

  async reply(envelope, ...strings) {
    this.emit('reply', envelope, strings);
  }

  async run() {
    this.emit('connected');
  }

  async close() {
    this.emit('close');
  }

  receive(message) {
    this.robot.receive(message);
  }
}

module.exports = {
  use(robot) {
    return new TestAdapter(robot);
  },
};
