Helper = require('hubot-test-helper')
chai = require 'chai'
nock = require 'nock'
fs = require 'fs'

expect = chai.expect

helper = new Helper('../src/philips-hue.coffee')

describe 'philips-hue', ->
  beforeEach ->
    process.env.HUBOT_LOG_LEVEL = 'ERROR'
    process.env.PHILIPS_HUE_IP = '1.2.3.4'
    process.env.PHILIPS_HUE_HASH = 'abc0123deadbeaf'
    nock.disableNetConnect()
    @room = helper.createRoom()
    nock('http://1.2.3.4')
      .get('/api/config')
      .replyWithFile(200, __dirname + '/fixtures/config.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf")
      .reply 200, fs.readFileSync('test/fixtures/datastore.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf/config")
      .reply 200, fs.readFileSync('test/fixtures/config.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf/groups")
      .reply 200, fs.readFileSync('test/fixtures/groups.json')

    nock('http://1.2.3.4')
      .post("/api/abc0123deadbeaf/groups")
      .reply 200, fs.readFileSync('test/fixtures/group-create.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf/groups/0")
      .reply 200, fs.readFileSync('test/fixtures/group-0.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf/groups/1")
      .reply 200, fs.readFileSync('test/fixtures/group-1.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf/lights")
      .reply 200, fs.readFileSync('test/fixtures/lights.json')

    nock('http://1.2.3.4')
      .get("/api/abc0123deadbeaf/lights/1")
      .reply 200, fs.readFileSync('test/fixtures/light.json')

    nock('http://1.2.3.4')
      .delete("/api/abc0123deadbeaf/groups/1")
      .reply 200, fs.readFileSync('test/fixtures/group-delete.json')

    nock('http://1.2.3.4')
      .put("/api/abc0123deadbeaf/lights/1/state")
      .reply 200, fs.readFileSync('test/fixtures/light-update.json')

    nock('http://1.2.3.4')
      .put("/api/abc0123deadbeaf/groups/0/action")
      .reply 200, fs.readFileSync('test/fixtures/group-update.json')

  afterEach ->
    @room.destroy()

  # hubot hue lights
  it 'returns lights', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue lights')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue lights']
        ['hubot', 'Connected hue lights:']
        ['hubot', '- 1: \'Hue color lamp 7\'']
      ]
    )

  # hubot hue light <light number>
  it 'returns single light', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue light 1')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue light 1']
        ['hubot', 'Light Status:']
        ['hubot', '- On: false']
        ['hubot', '- Reachable: true']
        ['hubot', '- Name: \'Hue color lamp 7\'']
        ['hubot', '- Model: LCT007 - Extended color light']
        ['hubot', '- Unique ID: 00:17:88:01:00:bd:c7:b9-0b']
        ['hubot', '- Software Version: 5.105.0.21169']
      ]
    )

  # hubot hue turn light <light number> <on|off>
  it 'turns a light off', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue turn light 1 off')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue turn light 1 off']
        ['hubot', 'Turning light 1 off ...']
        ['hubot', 'Light 1 turned off']
      ]
    )

  it 'turns a light on', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue turn light 1 on')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue turn light 1 on']
        ['hubot', 'Turning light 1 on ...']
        ['hubot', 'Light 1 turned on']
      ]
    )

  # hubot hue groups
  it 'returns groups', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue groups')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue groups']
        ['hubot', 'Light groups:']
        ['hubot', '- 0: \'Lightset 0\' (All)']
        ['hubot', '- 1: \'Group 1\' (1, 2)']
        ['hubot', '- 2: \'Group 2\' (3, 4, 5)']
      ]
    )

  # hubot hue config
  it 'returns the configuration', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue config')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue config']
        ['hubot', 'Base Station: \'Philips hue\'']
        ['hubot', 'IP: 192.168.1.7 / MAC: 00:17:88:00:00:00 / ZigBee Channel: 15']
        ['hubot', 'Software: 01012917 / API: 1.3.0']
      ]
    )

  # hubot hue (alert|alerts) light <light number>
  it 'alerts a light', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue alert light 1')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue alert light 1']
        ['hubot', 'Setting light 1 to short alert ...']
        ['hubot', 'Light 1 set to short alert']
      ]
    )

  it 'long alerts a light', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue alerts light 1')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue alerts light 1']
        ['hubot', 'Setting light 1 to long alert ...']
        ['hubot', 'Light 1 set to long alert']
      ]
    )

  # hubot hue (colors|colorloop|colorloop) (on|off) light <light number>
  it 'sets a light to colorloop on', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue colorloop on light 1')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue colorloop on light 1']
        ['hubot', 'Setting light 1 colorloop to on ...']
        ['hubot', 'Light 1 colorloop set to on']
      ]
    )

  it 'sets a light to colorloop off', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue colorloop off light 1')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue colorloop off light 1']
        ['hubot', 'Setting light 1 colorloop to off ...']
        ['hubot', 'Light 1 colorloop set to off']
      ]
    )

  # hubot hue hsb light <light number> <hue 0-65535> <saturation 0-254> <brightness 0-254>
  it 'sets a light by HSB value', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue hsb light 1 3000 200 100')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue hsb light 1 3000 200 100']
        ['hubot', 'Setting light 1 to: Hue=3000, Saturation=200, Brightness=100']
        ['hubot', 'Light 1 updated']
      ]
    )

  # hubot hue xy light <light number> <x 0.0-1.0> <y 0.0-1.0>
  it 'sets a light by XY value', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue xy light 1 0.5 0.6')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue xy light 1 0.5 0.6']
        ['hubot', 'Setting light 1 to: X=0.5, Y=0.6']
        ['hubot', 'Light 1 updated']
      ]
    )

  # hubot hue ct light <light number> <color temp 153-500>
  it 'sets a light by CT value', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue ct light 1 200')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue ct light 1 200']
        ['hubot', 'Setting light 1 to: CT=200']
        ['hubot', 'Light 1 updated']
      ]
    )

  # hubot hue group <group name>=[<comma separated list of light indexes>]
  it 'creates a group of lights', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue group livingroom=[1,2,3]')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue group livingroom=[1,2,3]']
        ['hubot', 'Setting livingroom to 1, 2, 3 ...']
        ['hubot', 'Group created!']
      ]
    )

  # hubot hue rm group <group number>
  it 'removes a group', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue rm group 1')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue rm group 1']
        ['hubot', 'Deleting Group 1 ...']
        ['hubot', 'Group deleted!']
      ]
    )

  # hubot hue @<group name> <on|off> - turn all lights in <group name> on or off
  it 'turns a group off', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue @all off')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue @all off']
        ['hubot', 'Setting light group 0 to off']
        ['hubot', 'Group all updated']
      ]
    )

  it 'turns a group on', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue @all on')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue @all on']
        ['hubot', 'Setting light group 0 to on']
        ['hubot', 'Group all updated']
      ]
    )

  # hubot hue @<group name> hsb=(<hue>,<sat>,<bri>)
  it 'sets group by HSB value', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue @all hsb=(3000,200,100)')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue @all hsb=(3000,200,100)']
        ['hubot', 'Setting light group 0 to: Hue=3000, Saturation=200, Brightness=100']
        ['hubot', 'Group all updated']
      ]
    )

  # hubot hue @<group name> xy=(<x>,<y>)
  it 'sets group by XY value', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue @all xy=(0.5,0.6)')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue @all xy=(0.5,0.6)']
        ['hubot', 'Setting light group 0 to: X=0.5, Y=0.6']
        ['hubot', 'Group all updated']
      ]
    )

  # hubot hue @<group name> ct=<color temp>
  it 'sets group by CT value', () ->
    selfRoom = @room
    testPromise = new Promise (resolve, reject) ->
      selfRoom.user.say('alice', '@hubot hue @all ct=200')
      setTimeout(() ->
        resolve()
      , 1000)

    testPromise.then ((result) ->
      expect(selfRoom.messages).to.eql [
        ['alice', '@hubot hue @all ct=200']
        ['hubot', 'Setting light group 0 to: CT=200']
        ['hubot', 'Group all updated']
      ]
    )
