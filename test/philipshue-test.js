const {
  describe, it, beforeEach, afterEach,
} = require('node:test');
const assert = require('node:assert/strict');
const mockHueApi = require('./common/mockHueApi');
const { createTestBot } = require('./common/TestBot');

describe('philips-hue', { concurrency: false }, () => {
  let bot;

  beforeEach(async () => {
    mockHueApi.resetCallCounts();
    bot = await createTestBot({
      HUBOT_LOG_LEVEL: 'ERROR',
      PHILIPS_HUE_IP: '1.2.3.4',
      PHILIPS_HUE_HASH: 'abc0123deadbeaf',
    });
  });

  afterEach(() => {
    bot.shutdown();
  });

  const say = async (message) => {
    await bot.say('alice', message);
  };

  it('returns lights', { concurrency: false }, async () => {
    await say('@hubot hue lights');
    assert.equal(mockHueApi.getCallCounts().lightsGetAll, 1);
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue lights'],
      ['hubot', 'Connected hue lights:'],
      ['hubot', "- 1: 'Hue color lamp 7'"],
    ]);
  });

  it('returns single light', { concurrency: false }, async () => {
    await say('@hubot hue light 1');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue light 1'],
      ['hubot', 'Light Status:'],
      ['hubot', '- On: false'],
      ['hubot', '- Reachable: true'],
      ['hubot', "- Name: 'Hue color lamp 7'"],
      ['hubot', '- Model: LCT007 - Extended color light'],
      ['hubot', '- Unique ID: 00:17:88:01:00:bd:c7:b9-0b'],
      ['hubot', '- Software Version: 5.105.0.21169'],
    ]);
  });

  it('turns a light off', { concurrency: false }, async () => {
    await say('@hubot hue turn light 1 off');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue turn light 1 off'],
      ['hubot', 'Turning light 1 off ...'],
      ['hubot', 'Light 1 turned off'],
    ]);
  });

  it('turns a light on', { concurrency: false }, async () => {
    await say('@hubot hue turn light 1 on');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue turn light 1 on'],
      ['hubot', 'Turning light 1 on ...'],
      ['hubot', 'Light 1 turned on'],
    ]);
  });

  it('returns groups', { concurrency: false }, async () => {
    await say('@hubot hue groups');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue groups'],
      ['hubot', 'Light groups:'],
      ['hubot', "- 0: 'Lightset 0' (All)"],
      ['hubot', "- 1: 'Group 1' (1, 2)"],
      ['hubot', "- 2: 'Group 2' (3, 4, 5)"],
    ]);
  });

  it('returns the configuration', { concurrency: false }, async () => {
    await say('@hubot hue config');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue config'],
      ['hubot', "Base Station: 'Philips hue'"],
      ['hubot', 'IP: 192.168.1.7 / MAC: 00:17:88:00:00:00 / ZigBee Channel: 15'],
      ['hubot', 'Software: 01012917 / API: 1.3.0'],
    ]);
  });

  it('alerts a light', { concurrency: false }, async () => {
    await say('@hubot hue alert light 1');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue alert light 1'],
      ['hubot', 'Setting light 1 to short alert ...'],
      ['hubot', 'Light 1 set to short alert'],
    ]);
  });

  it('long alerts a light', { concurrency: false }, async () => {
    await say('@hubot hue alerts light 1');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue alerts light 1'],
      ['hubot', 'Setting light 1 to long alert ...'],
      ['hubot', 'Light 1 set to long alert'],
    ]);
  });

  it('sets a light to colorloop on', { concurrency: false }, async () => {
    await say('@hubot hue colorloop on light 1');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue colorloop on light 1'],
      ['hubot', 'Setting light 1 colorloop to on ...'],
      ['hubot', 'Light 1 colorloop set to on'],
    ]);
  });

  it('sets a light to colorloop off', { concurrency: false }, async () => {
    await say('@hubot hue colorloop off light 1');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue colorloop off light 1'],
      ['hubot', 'Setting light 1 colorloop to off ...'],
      ['hubot', 'Light 1 colorloop set to off'],
    ]);
  });

  it('sets a light by HSB value', { concurrency: false }, async () => {
    await say('@hubot hue hsb light 1 3000 200 100');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue hsb light 1 3000 200 100'],
      ['hubot', 'Setting light 1 to: Hue=3000, Saturation=200, Brightness=100'],
      ['hubot', 'Light 1 updated'],
    ]);
  });

  it('sets a light by XY value', { concurrency: false }, async () => {
    await say('@hubot hue xy light 1 0.5 0.6');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue xy light 1 0.5 0.6'],
      ['hubot', 'Setting light 1 to: X=0.5, Y=0.6'],
      ['hubot', 'Light 1 updated'],
    ]);
  });

  it('sets a light by CT value', { concurrency: false }, async () => {
    await say('@hubot hue ct light 1 200');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue ct light 1 200'],
      ['hubot', 'Setting light 1 to: CT=200'],
      ['hubot', 'Light 1 updated'],
    ]);
  });

  it('creates a group of lights', { concurrency: false }, async () => {
    await say('@hubot hue group livingroom=[1,2,3]');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue group livingroom=[1,2,3]'],
      ['hubot', 'Setting livingroom to 1, 2, 3 ...'],
      ['hubot', 'Group created!'],
    ]);
  });

  it('removes a group', { concurrency: false }, async () => {
    await say('@hubot hue rm group 1');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue rm group 1'],
      ['hubot', 'Deleting Group 1 ...'],
      ['hubot', 'Group deleted!'],
    ]);
  });

  it('turns a group off', { concurrency: false }, async () => {
    await say('@hubot hue @all off');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue @all off'],
      ['hubot', 'Setting light group 0 to off'],
      ['hubot', 'Group all updated'],
    ]);
  });

  it('turns a group on', { concurrency: false }, async () => {
    await say('@hubot hue @all on');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue @all on'],
      ['hubot', 'Setting light group 0 to on'],
      ['hubot', 'Group all updated'],
    ]);
  });

  it('sets group by HSB value', { concurrency: false }, async () => {
    await say('@hubot hue @all hsb=(3000,200,100)');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue @all hsb=(3000,200,100)'],
      ['hubot', 'Setting light group 0 to: Hue=3000, Saturation=200, Brightness=100'],
      ['hubot', 'Group all updated'],
    ]);
  });

  it('sets group by XY value', { concurrency: false }, async () => {
    await say('@hubot hue @all xy=(0.5,0.6)');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue @all xy=(0.5,0.6)'],
      ['hubot', 'Setting light group 0 to: X=0.5, Y=0.6'],
      ['hubot', 'Group all updated'],
    ]);
  });

  it('sets group by CT value', { concurrency: false }, async () => {
    await say('@hubot hue @all ct=200');
    assert.deepEqual(bot.messages, [
      ['alice', '@hubot hue @all ct=200'],
      ['hubot', 'Setting light group 0 to: CT=200'],
      ['hubot', 'Group all updated'],
    ]);
  });
});
