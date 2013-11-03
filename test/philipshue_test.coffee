chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'

expect = chai.expect

describe 'philips-hue', ->
  beforeEach ->
    @robot =
      respond: sinon.spy()

    require('../src/philips-hue')(@robot)

  it 'registers a respond listener', ->
    expect(@robot.respond).to.have.been.calledWith(/hue lights/)
