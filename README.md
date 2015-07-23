# hubot-philipshue

This is a hubot plugin that will control your philips hue lights

[![Build Status](https://travis-ci.org/kingbin/hubot-philipshue.png)](https://travis-ci.org/kingbin/hubot-philipshue)

## Dependencies:
- [A Local Hubot Installation](https://github.com/github/hubot/blob/master/docs/README.md "A Local Hubot Installation")
- [Philips Hue Lightbulb system](https://www.meethue.com/en-US "Philips Hue Lightbulb system")
-	I'm using [campfire](https://campfirenow.com/ "campfire") to interact with my system.

Uses the [`node-hue-api`](https://github.com/peter-murray/node-hue-api "Node Hue API") NPM package to communicate with the hue bridge.

## Installation

###The Quick Installation
Run the following command to make sure the module is installed to your local Hubot instance.

```bash
$ npm install hubot-philipshue --save
```

###Manual Installation
Run the following command to install the module in your hubot project.

```bash
$ npm install hubot-philipshue
```

Add the package `hubot-philipshue` as a dependency in your Hubot `package.json` file.

```json
    "dependencies": {
      "hubot-philipshue": "*"
    }
```

###And then turn the Hubot script on
To enable the script, add the `hubot-philipshue` entry to the `external-scripts.json` file (you may need to create this file).

```json
["hubot-philipshue"]
```

## Configuration:
####Environment variables:

```bash
export PHILIPS_HUE_HASH="secrets"
export PHILIPS_HUE_IP="xxx.xxx.xxx.xxx"
```

####Getting your Hue Hash

 This needs to be done once, it seems older versions of the Hue bridge used an md5 hash as a 'username' but now you can use anything.

 Make an HTTP POST request of the following to http://YourHueHub/api

```json
{"username": "YourHash", "devicetype": "YourAppName"}
```
 
If you have not pressed the button on the Hue Hub you will receive an error like this;

```json
{"error":{"type":101,"address":"/","description":"link button not pressed"}}
```

Press the link button on the hub and try again and you should receive;

```json
{"success":{"username":"YourHash"}}
```

The key above will be the username you sent, remember this, you'll need it in all future requests

Example command Line script to set up your hash and Hubot Philips app:

```bash
$ curl -v -H "Content-Type: application/json" -X POST 'http://YourHueHub/api' -d '{"username": "YourHash", "devicetype": "YourAppName"}'
```

## Commands:
-   hubot hue lights - list all lights
-   hubot hue light {light number}  - shows light status
-   hubot hue hsb light {light number} {hue} {saturation} {brightness} 
    - hue range: 0-6553
    - saturation range: 0-254
    - brightness range: 0-254
-   hubot hue xy light {light number} {x} {y} 
    - x-y values are in the [CIE Color Space](http://developers.meethue.com/coreconcepts.html#color_gets_more_complicated)
    - valid x: 0.0-1.0
    - valid y: 0.0-1.0
-   hubot hue ct light {light number} {color temp}
    - color temperature values use [Mired color temperature](http://en.wikipedia.org/wiki/Mired) 
    - color temperature range: 153-500 (153 appears 6500K, 500 appears 2000K)
-   hubot hue turn light {light number} {on|off} - flips the switch
-   hubot hue groups - groups lights together to control with one API call
-   hubot hue config - reads bridge config
-   hubot hue hash - get a hash code (press the link button)
-   hubot hue linkbutton - programatically press the link button
-   hubot hue {alert|alerts} light {light number} - blink once or blink for 10 seconds specific light
-   hubot hue group {group name}=[{comma separated list of light indexes}]
-   hubot hue ls groups - lists the groups of lights
-   hubot hue rm group {group name} - remove grouping of lights named <group name>
-   hubot hue @{group name} off - turn all lights in <group name> off
-   hubot hue @{group name} on - turn all lights in <group name> on
-   hubot hue @{group name} hsb=({hue},{sat},{bri}) - set hsb value for all lights in group
-   hubot hue @{group name} xy=({x},{y}) - set x, y value for all lights in group
-   hubot hue @{group name} ct={color temp} - set color temp for all lights in group

## Notes:

## Author:
   [kingbin](https://github.com/kingbin "kingbin")
   
## Contributor:
   [stephenyeargin](https://github.com/stephenyeargin "stephenyeargin")
   
   [bschlief](https://github.com/bschlief "bschlief")
