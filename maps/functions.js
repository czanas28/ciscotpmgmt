const fs = require('fs');

const functions = new Map();
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

for (const file of functionFiles) {
    const func = require(`../functions/${file}`);
    functions.set(func.name, func)
}

exports.functions = functions;