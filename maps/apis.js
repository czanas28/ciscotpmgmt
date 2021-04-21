const fs = require('fs')

const apis = new Map();
const apiFiles = fs.readdirSync('./apis').filter(file => file.endsWith('.js'));

for (const file of apiFiles) {
    const api = require(`../apis/${file}`);
    apis.set(api.name, api)
}

exports.apis = apis;