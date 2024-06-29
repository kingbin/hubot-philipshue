// Description:
//   Control your Philips Hue Lights from HUBOT! BAM, easy candy for the kids
//
// Configuration:
//   PHILIPS_HUE_HASH : export PHILIPS_HUE_HASH="secrets"
//   PHILIPS_HUE_IP : export PHILIPS_HUE_IP="xxx.xxx.xxx.xxx"
//
// Setting your Hue Hash
//
// This needs to be done once, it seems older versions of the Hue bridge used an md5 hash as a
// 'username' but now you can use anything.
//
// Make an HTTP POST request of the following to http://YourHueHub/api
//
// {"username": "YourHash", "devicetype": "YourAppName"}
// If you have not pressed the button on the Hue Hub you will receive an error like this;
//
// {"error":{"type":101,"address":"/","description":"link button not pressed"}}
// Press the link button on the hub and try again and you should receive;
//
// {"success":{"username":"YourHash"}}
// The key above will be the username you sent, remember this, you'll need it in all future requests
//
// ie: curl -v -H "Content-Type: application/json" -X POST 'http://YourHueHub/api' -d '{"username": "YourHash", "devicetype": "YourAppName"}'
//
// Dependencies:
//   "node-hue-api": "^2.4"
//
// Commands:
//   hubot hue lights - list all lights
//   hubot hue light <light number>  - shows light status
//   hubot hue turn light <light number> <on|off> - flips the switch
//   hubot hue groups - lists the groups of lights
//   hubot hue config - reads bridge config
//   hubot hue (alert|alerts) light <light number> - blink or blink for 10 seconds specific light
//   hubot hue (colors|colorloop|colorloop) (on|off) light <light number> - toggle the colorloop
//   hubot hue hsb light <light number> <hue 0-65535> <saturation 0-254> <brightness 0-254>
//   hubot hue xy light <light number> <x 0.0-1.0> <y 0.0-1.0>
//   hubot hue ct light <light number> <color temp 153-500>
//   hubot hue group <group name>=[<comma separated list of light indexes>]
//   hubot hue rm group <group number> - remove grouping of lights with ID <group number>
//   hubot hue @<group name> <on|off> - turn all lights in <group name> on or off
//   hubot hue @<group name> hsb=(<hue>,<sat>,<bri>) - set hsb value for all lights in group
//   hubot hue @<group name> xy=(<x>,<y>) - set x, y value for all lights in group
//   hubot hue @<group name> ct=<color temp> - set color temp for all lights in group
//
// Author:
//   kingbin - chris.blazek@gmail.com

const hue = require('node-hue-api').v3;

const { LightState } = hue.lightStates;
const { GroupLightState } = hue.lightStates;

module.exports = (robot) => {
  // CLIENT
  const getClient = () => {
    const baseUrl = process.env.PHILIPS_HUE_IP;
    const hash = process.env.PHILIPS_HUE_HASH;
    // Connect based on provided string
    if (/^https:/i.test(baseUrl)) {
      return hue.api.createLocal(baseUrl).connect(hash);
    }
    return hue.api.createInsecureLocal(baseUrl).connect(hash);
  };

  const groupMap = (groupName, callback) => {
    const hueApi = getClient();
    hueApi
      .then((api) => api.groups.getAll())
      .then((groups) => {
        const result = { all: 0 };
        groups.forEach((group) => {
          result[group.name.toLowerCase()] = group.id;
        });
        const match = result[groupName.toLowerCase()];
        return callback(match);
      })
      .catch((err) => robot.logger.error(err));
  };

  const handleError = (res, err) => {
    robot.logger.debug(err);
    switch (err.code) {
      case 'ETIMEDOUT':
        res.send('Connection timed out to Hue bridge.');
        break;
      default:
        res.send(`An error ocurred: ${err}`);
    }
  };

  // GROUP COMMANDS
  robot.respond(/hue (?:ls )?groups/i, (msg) => {
    const hueApi = getClient();
    hueApi
      .then((api) => api.groups.getAll())
      .then((groups) => {
        robot.logger.debug(groups);
        msg.send('Light groups:');
        groups.map((group) => (group.id === 0
          ? msg.send(`- ${group.id}: '${group.name}' (All)`)
          : msg.send(
            `- ${group.id}: '${group.name}' (${group.lights.join(', ')})`,
          )));
      })
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue group (\w+)=(\[((\d)+,)*((\d)+)\])/i, (msg) => {
    const hueApi = getClient();
    const groupName = msg.match[1];
    const groupLights = JSON.parse(msg.match[2]);
    msg.send(`Setting ${groupName} to ${groupLights.join(', ')} ...`);
    hueApi
      .then((api) => {
        const lightGroup = hue.model.createLightGroup();
        lightGroup.name = groupName;
        lightGroup.lights = groupLights;
        api.groups.createGroup(lightGroup);
      })
      .then((group) => {
        robot.logger.debug(group);
        msg.send('Group created!');
      })
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue rm group (\d)/i, (msg) => {
    const hueApi = getClient();
    const groupId = msg.match[1];
    msg.send(`Deleting Group ${groupId} ...`);
    hueApi
      .then((api) => api.groups.deleteGroup(groupId))
      .then((response) => {
        robot.logger.debug(response);
        msg.send('Group deleted!');
      })
      .catch((err) => handleError(msg, err));
  });

  // LIGHT COMMANDS
  robot.respond(/hue lights/i, (msg) => {
    const hueApi = getClient();
    hueApi
      .then((api) => api.lights.getAll())
      .then((lights) => {
        robot.logger.debug(lights);
        msg.send('Connected hue lights:');
        lights.map((light) => msg.send(`- ${light.id}: '${light.name}'`));
      })
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue light (\d+)/i, (msg) => {
    const hueApi = getClient();
    const lightId = parseInt(msg.match[1], 10);
    hueApi
      .then((api) => api.lights.getLight(lightId))
      .then((light) => {
        robot.logger.debug(light);
        msg.send('Light Status:');
        msg.send(`- On: ${light.state.on}`);
        msg.send(`- Reachable: ${light.state.reachable}`);
        msg.send(`- Name: '${light.name}'`);
        msg.send(`- Model: ${light.modelid} - ${light.type}`);
        msg.send(`- Unique ID: ${light.uniqueid}`);
        msg.send(`- Software Version: ${light.swversion}`);
      })
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue @(.*) hsb=\((\d+),(\d+),(\d+)\)$/i, (msg) => {
    const hueApi = getClient();
    const [groupName, vHue, vSat, vBri] = msg.match.slice(1, 5);
    groupMap(groupName, (group) => {
      if (typeof group === 'undefined') {
        msg.send(`Could not find '${groupName}' in list of groups`);
        return;
      }
      msg.send(
        `Setting light group ${group} to: Hue=${vHue}, Saturation=${vSat}, Brightness=${vBri}`,
      );
      const lightState = new GroupLightState()
        .on(true)
        .bri(vBri)
        .hue(vHue)
        .sat(vSat);
      hueApi
        .then((api) => api.groups.setGroupState(group, lightState))
        .then((response) => {
          robot.logger.debug(response);
          msg.send(`Group ${groupName} updated`);
        })
        .catch((err) => handleError(msg, err));
    });
  });

  robot.respond(/hue hsb light (\d+) (\d+) (\d+) (\d+)/i, (msg) => {
    const hueApi = getClient();
    const [light, vHue, vSat, vBri] = msg.match.slice(1, 5);
    msg.send(
      `Setting light ${light} to: Hue=${vHue}, Saturation=${vSat}, Brightness=${vBri}`,
    );
    const lightState = new LightState().on(true).bri(vBri).hue(vHue)
      .sat(vSat);
    hueApi
      .then((api) => api.lights.setLightState(light, lightState))
      .then((response) => {
        robot.logger.debug(response);
        msg.send(`Light ${light} updated`);
      })
      .catch((err) => handleError(msg, err));
  });

  robot.respond(
    /hue @(\w+) xy=\(([0-9]*[.][0-9]+),([0-9]*[.][0-9]+)\)/i,
    (msg) => {
      const hueApi = getClient();
      const [groupName, x, y] = msg.match.slice(1, 4);
      groupMap(groupName, (group) => {
        if (typeof group === 'undefined') {
          msg.send(`Could not find '${groupName}' in list of groups`);
          return;
        }
        msg.send(`Setting light group ${group} to: X=${x}, Y=${y}`);
        const lightState = new GroupLightState().on(true).xy(x, y);
        hueApi
          .then((api) => api.groups.setGroupState(group, lightState))
          .then((response) => {
            robot.logger.debug(response);
            msg.send(`Group ${groupName} updated`);
          })
          .catch((err) => handleError(msg, err));
      });
    },
  );

  robot.respond(
    /hue xy light (.*) ([0-9]*[.][0-9]+) ([0-9]*[.][0-9]+)/i,
    (msg) => {
      const hueApi = getClient();
      const [light, x, y] = msg.match.slice(1, 4);
      msg.send(`Setting light ${light} to: X=${x}, Y=${y}`);
      const lightState = new LightState().on(true).xy(x, y);
      hueApi
        .then((api) => api.lights.setLightState(light, lightState))
        .then((response) => {
          robot.logger.debug(response);
          msg.send(`Light ${light} updated`);
        })
        .catch((err) => handleError(msg, err));
    },
  );

  robot.respond(/hue @(\w+) ct=(\d{3})/i, (msg) => {
    const hueApi = getClient();
    const [groupName, ct] = msg.match.slice(1, 3);
    groupMap(groupName, (group) => {
      if (typeof group === 'undefined') {
        msg.send(`Could not find '${groupName}' in list of groups`);
        return;
      }
      msg.send(`Setting light group ${group} to: CT=${ct}`);
      const lightState = new GroupLightState().on(true).ct(ct);
      hueApi
        .then((api) => api.groups.setGroupState(group, lightState))
        .then((response) => {
          robot.logger.debug(response);
          msg.send(`Group ${groupName} updated`);
        })
        .catch((err) => handleError(msg, err));
    });
  });

  robot.respond(/hue ct light (.*) (\d{3})/i, (msg) => {
    const hueApi = getClient();
    const [light, ct] = msg.match.slice(1, 3);
    msg.send(`Setting light ${light} to: CT=${ct}`);
    const lightState = new LightState().on(true).ct(ct);
    hueApi
      .then((api) => api.lights.setLightState(light, lightState))
      .then((response) => {
        robot.logger.debug(response);
        msg.send(`Light ${light} updated`);
      })
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue @(\w+) (on|off)/i, (msg) => {
    const hueApi = getClient();
    const [groupName, state] = msg.match.slice(1, 3);
    groupMap(groupName, (group) => {
      if (typeof group === 'undefined') {
        msg.send(`Could not find '${groupName}' in list of groups`);
        return;
      }
      msg.send(`Setting light group ${group} to ${state}`);
      const lightState = new GroupLightState().on(state === 'on');
      hueApi
        .then((api) => api.groups.setGroupState(group, lightState))
        .then((response) => {
          robot.logger.debug(response);
          msg.send(`Group ${groupName} updated`);
        })
        .catch((err) => handleError(msg, err));
    });
  });

  robot.respond(/hue turn light (\d+) (on|off)/i, (msg) => {
    const hueApi = getClient();
    const lightId = msg.match[1];
    const state = msg.match[2];
    msg.send(`Turning light ${lightId} ${state} ...`);
    hueApi
      .then((api) => {
        const lightState = new LightState().on(state === 'on');
        api.lights.setLightState(lightId, lightState);
      })
      .then(() => msg.send(`Light ${lightId} turned ${state}`))
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue (alert|alerts) light (.+)/i, (msg) => {
    let alertText;
    let lightState;
    const hueApi = getClient();
    const alertLength = msg.match[1];
    const lightId = parseInt(msg.match[2], 10);
    if (alertLength === 'alert') {
      alertText = 'short alert';
      lightState = new LightState().alertShort();
    } else {
      alertText = 'long alert';
      lightState = new LightState().alertLong();
    }
    msg.send(`Setting light ${lightId} to ${alertText} ...`);
    hueApi
      .then((api) => api.lights.setLightState(lightId, lightState))
      .then(() => msg.send(`Light ${lightId} set to ${alertText}`))
      .catch((err) => handleError(msg, err));
  });

  robot.respond(/hue (?:colors|colorloop|loop) (on|off) light (.+)/i, (msg) => {
    let lightState;
    const hueApi = getClient();
    const loopState = msg.match[1];
    const lightId = parseInt(msg.match[2], 10);
    if (loopState === 'on') {
      lightState = new LightState().on().effect('colorloop');
    } else {
      lightState = new LightState().on().effect('none');
    }
    msg.send(`Setting light ${lightId} colorloop to ${loopState} ...`);
    hueApi
      .then((api) => api.lights.setLightState(lightId, lightState))
      .then(() => msg.send(`Light ${lightId} colorloop set to ${loopState}`))
      .catch((err) => handleError(msg, err));
  });

  // BRIDGE COMMANDS
  robot.respond(/hue config/i, (msg) => {
    const hueApi = getClient();
    hueApi
      .then((api) => api.configuration.getConfiguration())
      .then((config) => {
        robot.logger.debug(config);
        msg.send(`Base Station: '${config.name}'`);
        msg.send(
          `IP: ${config.ipaddress} / MAC: ${config.mac} / ZigBee Channel: ${config.zigbeechannel}`,
        );
        msg.send(`Software: ${config.swversion} / API: ${config.apiversion}`);
      })
      .catch((err) => handleError(msg, err));
  });
};
