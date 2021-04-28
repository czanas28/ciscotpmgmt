module.exports = {
    name: 'heartbeat',
    desc: 'Used to ping each device before attempting the SSH connection',
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
