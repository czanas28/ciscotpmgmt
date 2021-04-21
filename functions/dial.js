module.exports = {
    name: 'dial',
    desc: 'Used to dial a uri',
    execute(xapi, number, domain) {
        let dialedNum = `${number}@${domain}`;
        xapi.Command.Dial({ Number: dialedNum });
    },
};