const jsxapi = require('jsxapi');

module.exports = {
    name: 'callStatus',
    desc: 'Check the call status of another device',
    execute(hostname) {
        const { variables } = require('../maps/variables');
        jsxapi.connect({
            host: hostname,
            username: process.env.TP_DEVICE_USER,
            password: process.env.TP_DEVICE_PASSWORD
        })
        .once('ready', async (xapi) => {
            let call = await xapi.Status.SystemUnit.State.NumberOfActiveCalls.get();
            call = parseInt(call, 10);
            if (call > 0) {
                variables.set('callStatus', true)
            } else {
                variables.set('callStatus', false)
                }
        })
    }
}