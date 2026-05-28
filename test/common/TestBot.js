const path = require('path');
const mockHueApi = require('./mockHueApi');

const scriptPath = require.resolve('../../src/philips-hue');
const hueApiPath = require.resolve('node-hue-api');

const loadScript = () => {
  delete require.cache[scriptPath];
  require.cache[hueApiPath] = {
    id: hueApiPath,
    filename: hueApiPath,
    loaded: true,
    exports: mockHueApi,
  };
  // eslint-disable-next-line global-require
  return require('../../src/philips-hue');
};

class TestBotContext {
  constructor(robot, TextMessage) {
    this.robot = robot;
    this.TextMessage = TextMessage;
    this.messages = [];
    this.robot.adapter.on('send', (_, strings) => {
      strings.forEach((message) => this.messages.push(['hubot', message]));
    });
    this.robot.adapter.on('reply', (_, strings) => {
      strings.forEach((message) => this.messages.push(['hubot', message]));
    });
  }

  async say(name, message, waitMs = 150) {
    const user = this.robot.brain.userForId(name, { name, room: '#testroom' });
    this.messages.push([name, message]);
    const id = (Math.random() + 1).toString(36).substring(7);
    this.robot.adapter.receive(new this.TextMessage(user, message, id));
    await new Promise((resolve) => {
      setTimeout(resolve, waitMs);
    });
  }

  shutdown() {
    delete process.env.HUBOT_LOG_LEVEL;
    delete process.env.PHILIPS_HUE_IP;
    delete process.env.PHILIPS_HUE_HASH;
    this.robot.shutdown();
  }
}

async function createTestBot(settings = {}) {
  const { Robot, TextMessage } = await import('hubot');

  process.env.HUBOT_LOG_LEVEL = settings.HUBOT_LOG_LEVEL || 'ERROR';
  process.env.PHILIPS_HUE_IP = settings.PHILIPS_HUE_IP || '1.2.3.4';
  process.env.PHILIPS_HUE_HASH = settings.PHILIPS_HUE_HASH || 'abc0123deadbeaf';

  const robot = new Robot(path.resolve(__dirname, 'adapter'), false, 'hubot');
  await robot.loadAdapter(path.resolve(__dirname, 'adapter.js'));
  const script = loadScript();
  script(robot);

  return new Promise((resolve) => {
    robot.adapter.on('connected', () => {
      resolve(new TestBotContext(robot, TextMessage));
    });
    robot.run();
  });
}

module.exports = { createTestBot, TestBotContext };
