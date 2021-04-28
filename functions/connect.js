const jsxapi = require('jsxapi');

module.exports = {
    name: 'connect',
    desc: 'Used to connect to an endpoint',
    execute(hostname) {
        const { functions } = require('../maps/functions');
        const { reachable } = require('../maps/reachable');
        const { connected } = require('../maps/connected');
        //Connects to each device by hostname
        jsxapi.connect({
            host: hostname,
            username: process.env.TP_DEVICE_USER,
            password: process.env.TP_DEVICE_PASSWORD
        })
        .once('ready', (xapi) => {
            connected.set(hostname, true); //Sets the connected flag to true to avoid a connect loop
            functions.get('setInterface').execute(xapi, hostname); //Sets the custom ui, if applicable
            console.log(`Successfully connected to: ${hostname}`);
        })
        .on('ready', (xapi) => {
            functions.get('listenToGui').execute(xapi, hostname); //Runs the GUI event listener
            functions.get('listenToCalls').execute(xapi, hostname); //Runs the Call event listener
        })
        .on('error', (err) => {
            reachable.set(hostname, true); //Sets the hostname to true for the heartbeat function
            connected.delete(hostname); //Deletes the Connected flag so the connect loop will try this device again
            console.log(`Connection failed on : ${hostname} at `, new Date().toLocaleTimeString(), err);
        })
    }
}
