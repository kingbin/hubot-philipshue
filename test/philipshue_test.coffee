chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

expect = chai.expect

describe 'philips-hue', ->
  beforeEach ->
    @robot =
      respond: sinon.spy()

    require('../src/philips-hue')(@robot)

  it 'registers a groups listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue (?:ls )?groups/i)
  it 'registers a group add listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue group (\w+)=(\[((\d)+,)*((\d)+)\])/i)
  it 'registers a group remove listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue rm group (\d)/i)
  it 'registers a lights listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue lights/i)
  it 'registers a light listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue light (.*)/i)
  it 'registers a group HSB listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue @(\d+) hsb=\((\d+),(\d+),(\d+)\)/i)
  it 'registers a light HSB listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue hsb light (\d+) (\d+) (\d+) (\d+)/i)
  it 'registers a group XY listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue @(\d+) xy=\(([0-9]*[.][0-9]+),([0-9]*[.][0-9]+)\)/i)
  it 'registers a light XY listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue xy light (.*) ([0-9]*[.][0-9]+) ([0-9]*[.][0-9]+)/i)
  it 'registers a group color temperature listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue @(\w+) ct=(\d{3})/i)
  it 'registers a light color temperature listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue ct light (.*) (\d{3})/i)
  it 'registers a group switch listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue @(\w+) (on|off)/i)
  it 'registers a light switch listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue turn light (\d+) (on|off)/i)
  it 'registers a light alert listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue (alert|alerts) light (.+)/i)
  it 'registers a config listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue config/i)
  it 'registers a hash listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue hash/i)
  it 'registers a link button listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue (link|linkbutton|link button)/i)
