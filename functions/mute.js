module.exports = {
    name: 'mute',
    desc: 'Mute the endpoint',
    execute(xapi, hostname) {
        const { devices } = require('../maps/devices');
        if (devices.get(hostname).muteOnCallStart === true) {
            xapi.Command.Audio.Microphones.Mute();
        } else { return; }
    }
}