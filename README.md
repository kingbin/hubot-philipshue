# hubot-philipshue

This is a Hubot script package that will control your Philips Hue lights.

[![Build Status](https://travis-ci.org/kingbin/hubot-philipshue.png)](https://travis-ci.org/kingbin/hubot-philipshue)

## Dependencies

- [A Local Hubot Installation](https://github.com/github/hubot/blob/master/docs/README.md "A Local Hubot Installation")
- [Philips Hue Lightbulb system](https://www.meethue.com/en-US "Philips Hue Lightbulb system")
-	I'm using [campfire](https://campfirenow.com/ "campfire") to interact with my system. Other [adapters](https://github.com/github/hubot/blob/master/docs/adapters.md) should work as well.

Uses the [`node-hue-api`](https://github.com/peter-murray/node-hue-api "Node Hue API") NPM package to communicate with the hue bridge.

## Installation

Run the following command to make sure the module is installed to your local Hubot instance.

```bash
$ npm install hubot-philipshue --save
```

To enable the script, add the `hubot-philipshue` entry to the `external-scripts.json` file (you may need to create this file).

```json
["hubot-philipshue"]
```

## Configuration

### Environment variables

| Variable           | Description                                |
| ------------------ | ------------------------------------------ |
| `PHILIPS_HUE_HASH` | The generated secret hash described below. |
| `PHILIPS_HUE_IP`   | The IP address of your Hue Hub.            |

```bash
export PHILIPS_HUE_HASH="YourSecretHash"
export PHILIPS_HUE_IP="xxx.xxx.xxx.xxx"
```

### Getting your Hue Hash

There is a two-step process to generating the credentials above.

First, press the button on your Hue Hub. This puts the device in a mode to accept new connections.

Second, make an HTTP POST request of the JSON payload below to `http://YourHueHub/api`. You can use the [Clip API Debugger](http://www.developers.meethue.com/documentation/getting-started) on your base station as well.

```bash
$ curl -v -H "Content-Type: application/json" -X POST 'http://YourHueHub/api' -d '{"devicetype": "YourAppName"}'
```

The Hub will respond with:

```json
{"success":{"username":"YourSecretHash"}}
```

The `username` property will contain the hash key to use in the `PHIPLIPS_HUE_HASH` environment variable.

#### Troubleshooting

If you have not pressed the button on the Hue Hub you will receive an error like this:

```json
{"error":{"type":101,"address":"/","description":"link button not pressed"}}
```

Press the link button on the hub and try again.

## Commands:
-   hubot hue lights - list all lights
-   hubot hue light {light number}  - shows light status
-   hubot hue hsb light {light number} {hue 0-6553} {saturation 0-254} {brightness 0-254} 
-   hubot hue xy light {light number} {x 0.0-1.0} {y 0.0-1.0} 
-   hubot hue ct light {light number} {color temp 153-500}
-   hubot hue turn light {light number} {on|off} - flips the switch
-   hubot hue groups - groups lights together to control with one API call
-   hubot hue config - reads bridge config
-   hubot hue hash - get a hash code (press the link button)
-   hubot hue linkbutton - programatically press the link button
-   hubot hue {alert|alerts} light {light number} - blink once or blink for 10 seconds specific light
-   hubot hue {colors|colorloop|loop} {on|off} light {light number} - enable or disable the colorloop effect
-   hubot hue group {group name}=[{comma separated list of light indexes}]
-   hubot hue ls groups - lists the groups of lights
-   hubot hue rm group {group name} - remove grouping of lights named <group name>
-   hubot hue @{group name} off - turn all lights in <group name> off
-   hubot hue @{group name} on - turn all lights in <group name> on
-   hubot hue @{group name} hsb=({hue},{sat},{bri}) - set hsb value for all lights in group
-   hubot hue @{group name} xy=({x},{y}) - set x, y value for all lights in group
-   hubot hue @{group name} ct={color temp} - set color temp for all lights in group

## Notes:

- x-y values are in the [CIE Color Space](http://developers.meethue.com/coreconcepts.html#color_gets_more_complicated)
- color temperature values use [Mired color temperature](http://en.wikipedia.org/wiki/Mired) 
- color temperature range: 153-500 (153 appears 6500K, 500 appears 2000K)

## Author:
   [kingbin](https://github.com/kingbin "kingbin")
   
## Contributor:
   [stephenyeargin](https://github.com/stephenyeargin "stephenyeargin")
   
   [bschlief](https://github.com/bschlief "bschlief")
