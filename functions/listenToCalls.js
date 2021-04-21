module.exports = {
    name: 'listenToCalls',
    desc: 'Listens to calls from the endpoints',
    execute(xapi, hostname) {
        const { functions } =require("../maps/functions")
        const { devices } = require("../maps/devices");
        const { apis } = require("../maps/apis");
        const { variables } = require("../maps/variables");
        
        xapi.Event.CallSuccessful.on(async () => {
            const call = await xapi.Status.Call.get();
            console.log(`${hostname} placed a call to ${call[0].CallbackNumber} at `, new Date().toLocaleString());
            if (call.length < 1) {
                return;
            }
            let split = call[0].CallbackNumber.split("@"); //Splits the called number at the @ to seperate URI and Domain
            let callId = split[0].substring(split[0].indexOf(":") + 1); //Grabs the uri string.. Cisco TP prepends a sip: .. this must be removed
            let domain = split[1]; //Grabs the domain string

            //Chooses which api to query by the domain
            switch(domain) {
                case process.env.CMS_DOMAIN:
                    await apis.get('cms').listenToCalls(callId, hostname); //Checks the API
                    //Loops through the 'Accounts' on the device to determine if it is authorized to send the PIN
                    devices.get(hostname).cmsAccounts.forEach((account) => {
                        if (account == variables.get(`${hostname}${callId}ownerJid`)) {
                            if (variables.get(`${hostname}${callId}cmsPin`) == undefined) {
                                return; 
                            } else {
                                //Sends the PIN
                                xapi.Command.Call.DTMFSend({ DTMFString: variables.get(`${hostname}${callId}cmsPin`) + '#' });
                                functions.get('mute').execute(xapi, hostname);
                                // xapi.Command.Audio.Microphones.Mute();
                            }
                        } else { return; }
                    });
                    break;
                case process.env.ZOOM_DOMAIN:
                    await apis.get('zoom').listenToCalls(callId, hostname); //Checks the API
                    //Loops through the 'Accounts' on the device to determine if it is authorized to send the PIN
                    devices.get(hostname).zoomAccounts.forEach((account) => {   
                        if (account == variables.get(`${hostname}${callId}hostEmail`)) {
                            if (variables.get(`${hostname}${callId}pin`) == undefined) {
                                return; 
                            } else {
                                setTimeout(() => {
                                    //Sends the PIN
                                    xapi.Command.Call.DTMFSend({ DTMFString: variables.get(`${hostname}${callId}pin`) + '#' });
                                    functions.get('mute').execute(xapi, hostname);
                                    // xapi.Command.Audio.Microphones.Mute();
                                }, 4000)
                                
                            }
                        } else { return; }                        
                    });
                    break;
                default:
                    console.log(`No Domain Match on ${hostname} at `, new Date());
            }          
        });
    }
}