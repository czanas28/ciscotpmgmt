const fs = require('fs');

const devices = new Map();
const deviceFiles = fs.readdirSync('./devices').filter(file => file.endsWith('.js'));

for (const file of deviceFiles) {
    const device = require(`../devices/${file}`);
    devices.set(device.name, device)
}

exports.devices = devices;