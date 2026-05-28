/* eslint-disable max-classes-per-file */

class LightState {
  on(value = true) { this.onValue = value; return this; }

  bri(value) { this.briValue = value; return this; }

  hue(value) { this.hueValue = value; return this; }

  sat(value) { this.satValue = value; return this; }

  xy(x, y) { this.xyValue = [x, y]; return this; }

  ct(value) { this.ctValue = value; return this; }

  alertShort() { this.alertValue = 'select'; return this; }

  alertLong() { this.alertValue = 'lselect'; return this; }

  effect(value) { this.effectValue = value; return this; }
}

class GroupLightState extends LightState {}

const callCounts = {
  connect: 0,
  groupsGetAll: 0,
  groupsCreateGroup: 0,
  groupsDeleteGroup: 0,
  groupsSetGroupState: 0,
  lightsGetAll: 0,
  lightsGetLight: 0,
  lightsSetLightState: 0,
  configurationGetConfiguration: 0,
};

const count = (name) => {
  callCounts[name] += 1;
};

const resetCallCounts = () => {
  Object.keys(callCounts).forEach((key) => {
    callCounts[key] = 0;
  });
};

const getCallCounts = () => ({ ...callCounts });

const groups = [
  {
    id: 0, name: 'Lightset 0', lights: ['1', '2'], type: 'LightGroup',
  },
  {
    id: 1, name: 'Group 1', lights: ['1', '2'], type: 'Room',
  },
  {
    id: 2, name: 'Group 2', lights: ['3', '4', '5'], type: 'LightGroup',
  },
];

const light = {
  id: 1,
  state: {
    on: false,
    reachable: true,
  },
  name: 'Hue color lamp 7',
  modelid: 'LCT007',
  type: 'Extended color light',
  uniqueid: '00:17:88:01:00:bd:c7:b9-0b',
  swversion: '5.105.0.21169',
};

const configuration = {
  name: 'Philips hue',
  ipaddress: '192.168.1.7',
  mac: '00:17:88:00:00:00',
  zigbeechannel: 15,
  swversion: '01012917',
  apiversion: '1.3.0',
};

function createApi() {
  return {
    groups: {
      getAll: async () => {
        count('groupsGetAll');
        return groups;
      },
      createGroup: async () => {
        count('groupsCreateGroup');
        return [{ success: { id: '3' } }];
      },
      deleteGroup: async () => {
        count('groupsDeleteGroup');
        return [{ success: '/groups/1 deleted' }];
      },
      setGroupState: async () => {
        count('groupsSetGroupState');
        return [{ success: true }];
      },
    },
    lights: {
      getAll: async () => {
        count('lightsGetAll');
        return [light];
      },
      getLight: async () => {
        count('lightsGetLight');
        return light;
      },
      setLightState: async () => {
        count('lightsSetLightState');
        return [{ success: true }];
      },
    },
    configuration: {
      getConfiguration: async () => {
        count('configurationGetConfiguration');
        return configuration;
      },
    },
  };
}

const v3 = {
  api: {
    createInsecureLocal() {
      return {
        connect: async () => {
          count('connect');
          return createApi();
        },
      };
    },
    createLocal() {
      return {
        connect: async () => {
          count('connect');
          return createApi();
        },
      };
    },
  },
  model: {
    createLightGroup() {
      return {};
    },
  },
  lightStates: {
    LightState,
    GroupLightState,
  },
};

module.exports = {
  v3,
  resetCallCounts,
  getCallCounts,
};
