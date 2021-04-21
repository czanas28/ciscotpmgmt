const fs = require('fs');

const interfaces = new Map();
const interfaceFiles = fs.readdirSync('./interfaces').filter(file => file.endsWith('.js'));

for (const file of interfaceFiles) {
    const ui = require(`../interfaces/${file}`);
    interfaces.set(ui.name, ui.customUi)
}

exports.interfaces = interfaces;