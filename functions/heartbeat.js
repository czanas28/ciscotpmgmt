module.exports = {
    name: 'heartbeat',
    desc: 'Used to check if an SSH session is still active between the server and device',
    execute(hostname) {
        const ping = require('ping');
        const { reachable } = require('../maps/reachable');
        ping.sys.probe(hostname, (isReachable) => {
            if (isReachable) {
                reachable.set(hostname, true);
            } else {
                reachable.set(hostname, false);
            }
        })
    }
}