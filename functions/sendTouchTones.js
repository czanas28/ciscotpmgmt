module.exports = {
    name: 'sendTouchTones',
    desc: 'Sends touchtones',
    execute(xapi, passcode) {
        xapi.Command.Call.DTMFSend({ DTMFString: `${passcode}#` });
    }
}

//This stupid function does not want to work for whatever reason and I hate it