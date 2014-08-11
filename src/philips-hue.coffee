# Description:
#   Control your Philips Hue Lights from HUBOT! BAM, easy candy for the kids
#
# Dependencies:
#
# Configuration:
# This script is dependent on environment variables:
#   PHILIPS_HUE_HASH : export PHILIPS_HUE_HASH="secrets"
#   PHILIPS_HUE_IP : export PHILIPS_HUE_IP="xxx.xxx.xxx.xxx"
#
# Setting your Hue Hash
#
# This needs to be done once, it seems older versions of the Hue bridge used an md5 hash as a 'username' but now you can use anything.
#
# Make an HTTP POST request of the following to http://YourHueHub/api
#
# {"username": "YourHash", "devicetype": "YourAppName"}
# If you have not pressed the button on the Hue Hub you will receive an error like this;
#
# {"error":{"type":101,"address":"/","description":"link button not pressed"}}
# Press the link button on the hub and try again and you should receive;
#
# {"success":{"username":"YourHash"}}
# The key above will be the username you sent, remember this, you'll need it in all future requests
#
# ie: curl -v -H "Content-Type: application/json" -X POST 'http://YourHueHub/api' -d '{"username": "YourHash", "devicetype": "YourAppName"}'
#
#
# Commands:
#   hubot hue lights - list all lights
#   hubot hue light <light number>  - shows light status
#   hubot hue turn light <light number> <on|off> - flips the switch
#   hubot hue groups - groups lights together to control with one API call
#   hubot hue config - reads bridge config
#   hubot hue hash - get a hash code (press the link button)
#   hubot hue set config (name|linkbutton) <value>- change the name or programatically press the link button
#   hubot hue (alert|alerts) light <light number> - blink once or blink for 10 seconds specific light
#   hubot hue hsb light <light number> <hue 0-65535> <saturation 0-254> <brightness 0-254>
#   hubot hue xy light <light number> <x 0.0-1.0> <y 0.0-1.0>
#   hubot hue ct light <light number> <color temp 153-500>
#   hubot hue group <group name>=[<comma separated list of light indexes>]
#   hubot hue ls groups - lists the groups of lights
#   hubot hue rm group <group name> - remove grouping of lights named <group name>
#   hubot hue @<group name> off - turn all lights in <group name> off
#   hubot hue @<group name> on - turn all lights in <group name> on
#   hubot hue @<group name> hsb=(<hue>,<sat>,<bri>) - set hsb value for all lights in group
#   hubot hue @<group name> xy=(<x>,<y>) - set x, y value for all lights in group
#   hubot hue @<group name> ct=<color temp> - set color temp for all lights in group
#
# Notes:
#
# Author:
#   kingbin - chris.blazek@gmail.com


module.exports = (robot) ->
  base_url = process.env.PHILIPS_HUE_IP
  hash  = process.env.PHILIPS_HUE_HASH


# If you have more than the initial 3 lights, add them to the 'all' array below
  fake_groups = 
    1: [1]
    2: [2]
    3: [3]
    all: [1,2,3]

# GROUP COMMANDS
  robot.respond /hue groups/i, (msg) ->
    url = "http://#{base_url}/api/#{hash}/groups"
    getGenInfo msg, url, (responseText) ->
      msg.send "Groups: " + responseText

# FAKE GROUP COMMANDS
  robot.respond /hue group (\w+)=(\[((\d)+,)*((\d)+)\])/i, (msg) ->
    msg.send "setting " + msg.match[1] + "=" +msg.match[2]
    fake_groups[msg.match[1]] = JSON.parse(msg.match[2])

  robot.respond /hue rm group (\w+)/i, (msg) ->
    msg.send "removing " + msg.match[1]
    delete fake_groups[msg.match[1]]

  robot.respond /hue ls groups/i, (msg) ->
    for key of fake_groups
      msg.send key + " = [" + fake_groups[key] + "]"

# LIGHT COMMANDS
  robot.respond /hue lights/i, (msg) ->
    light = msg.match[1]
    url = "http://#{base_url}/api/#{hash}/lights"
    getGenInfo msg, url, (responseText) ->
      msg.send responseText

  robot.respond /hue light (.*)/i, (msg) ->
    light = msg.match[1]
    url = "http://#{base_url}/api/#{hash}/lights/#{light}"
    getGenInfo msg, url, (responseText) ->
      msg.send responseText

  robot.respond /hue @(\w+) hsb=\((\d+),(\d+),(\d+)\)/i, (msg) ->
    [group_name,hue,sat,bri] = msg.match[1..4]
    jsonParams =
      hue: parseInt(hue)
      sat: parseInt(sat)
      bri: parseInt(bri)
    fake_groups[group_name].forEach (light) ->
      url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
      setInfo msg, url, jsonParams, (responseText) ->
        msg.send "okay. set the following lights: " + fake_groups[group_name]

  robot.respond /hue hsb light (.*) (\d+) (\d+) (\d+)/i, (msg) ->
    [light,hue,sat,bri] = msg.match[1..4]
    jsonParams =
      hue: parseInt(hue)
      sat: parseInt(sat)
      bri: parseInt(bri)
    url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
    setInfo msg, url, jsonParams, (responseText) ->
      msg.send responseText

  robot.respond /hue @(\w+) xy=\(([0-9]*[.][0-9]+),([0-9]*[.][0-9]+)\)/i, (msg) ->
    [group_name,x_str,y_str] = msg.match[1..3]
    x = parseFloat(x_str)
    y = parseFloat(y_str)
    jsonParams =
      xy: [x,y]
    fake_groups[group_name].forEach (light) ->
      url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
      setInfo msg, url, jsonParams, (responseText) ->
        msg.send "okay. set the following lights: " + fake_groups[group_name]

  robot.respond /hue xy light (.*) ([0-9]*[.][0-9]+) ([0-9]*[.][0-9]+)/i, (msg) ->
    [light,x_str,y_str] = msg.match[1..3]
    x = parseFloat(x_str)
    y = parseFloat(y_str)
    jsonParams =
       xy: [x,y]
    url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
    setInfo msg, url, jsonParams, (responseText) ->
      msg.send responseText

  robot.respond /hue @(\w+) ct=(\d\d\d)/i, (msg) ->
    [group_name,color_temp] = msg.match[1..2]
    jsonParams =
      ct: parseInt(color_temp)
    fake_groups[group_name].forEach (light) ->
      url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
      setInfo msg, url, jsonParams, (responseText) ->
        msg.send "okay. set the following lights: " + fake_groups[group_name]
        
  robot.respond /hue ct light (.*) (\d\d\d)/i, (msg) ->
    [light,color_temp] = msg.match[1..2]
    jsonParams =
       ct: parseInt(color_temp)
    url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
    setInfo msg, url, jsonParams, (responseText) ->
      msg.send responseText

  robot.respond /hue @(\w+) (on|off)/i, (msg) ->
    [group_name, state] = msg.match[1..2]
    jsonParams =
      on: if state is "on" then true else false 
    fake_groups[group_name].forEach (light) ->
      url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
      setInfo msg, url, jsonParams, (responseText) ->
        msg.send "okay. set the following lights: " + fake_groups[group_name]

  robot.respond /hue turn light (.+) (.+)/i, (msg) ->
    [light, state] = msg.match[1..2]
    msg.send "get off your LAZY ass and turn it " + state + " yourself"
    jsonParams =
       on: if state is "on" then true else false
    url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
    setInfo msg, url, jsonParams, (responseText) ->
      msg.send responseText

  robot.respond /hue (alert|alerts) light (.+)/i, (msg) ->
    [state,light] = msg.match[1..2]
    msg.send "ain't nobody got time for that!"

    jsonParams = alert: if state is "alert" then "select" else "lselect"

    url = "http://#{base_url}/api/#{hash}/lights/#{light}/state"
    setInfo msg, url, jsonParams, (responseText) ->
      msg.send responseText


# BRIDGE COMMANDS
  robot.respond /hue config/i, (msg) ->
    url = "http://#{base_url}/api/#{hash}/config"
    getGenInfo msg, url, (responseText) ->
      msg.send "Config: " + responseText

  robot.respond /hue hash/i, (msg) ->
    msg.http("http://#{base_url}/api")
      .headers(Accept: 'application/json')
      .post(JSON.stringify({devicetype: "hubot"})) (err, res, body) ->
        for line in JSON.parse(body)
          do (line) ->
            if (line.error)
              msg.send line.error.description
            if (line.success)
              msg.send "Hash:" + line.success.username

  robot.respond /hue set config ([^\s]*) (.*)/i, (msg) ->
    [setting,val] = msg.match[1..2]
    supportedSettings = ['name','linkbutton']
    if setting in supportedSettings

      switch setting
        when "name" then jsonParams = name: val
        when "linkbutton" then jsonParams = linkbutton: val

      msg.send JSON.stringify(jsonParams)
      url = "http://#{base_url}/api/#{hash}/config"
      setInfo msg, url, jsonParams, (responseText) ->
        msg.send responseText
    else
      msg.send "unsupported config setting"


#  robot.respond /rollout activate_user ([^\s]*) ([^\s]*)/i, (msg) ->
#    msg.http(endpoint + msg.match[1] + '/users').query(user: msg.match[2]).put() (err, res, body) ->
#      show(msg, msg.match[1])

getGenInfo = (msg, url, callback) ->
    msg.http(url)
      .headers(Accept: 'application/json')
      .get() (err, res, body) ->
         if 200 <= res.statusCode <= 299
           callback JSON.stringify(JSON.parse(body),null,'\t')
         else
           callback res.statusCode

setInfo = (msg, url, jsonParams, callback) ->
    msg.http(url)
      .put(JSON.stringify(jsonParams)) (err, res, body) ->
            if 200 <= res.statusCode <= 299
              callback JSON.stringify(JSON.parse(body),null,'\t')
            else
              callback res.statusCode
