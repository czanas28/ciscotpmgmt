module.exports = {
    name: 'setInterface',
    desc: 'Sets the custom interface on a device if it has one',
    execute(xapi, hostname) {
        const { devices } = require('../maps/devices');
        const { interfaces } = require('../maps/interfaces');
               
        if (devices.get(hostname).customUi === true) {
                if (!interfaces.has(hostname)) {
                    console.log(`No interface file found for ${hostname}`);
                    return;
                    // var fs = require('fs')
                    // fs.readFile(`./devices/${hostname}.js`, 'utf8', function (err,data) {
                    //     if (err) {
                    //         return console.log(err);
                    //     }
                    //     var result = data.replace('customUi: false', 'customUi: false');

                    //     fs.writeFile(`./devices/${hostname}.js`, result, 'utf8', function (err) {
                    //         if (err) return console.error(err);
                    //         });
                    //     });
                } else {
                    xapi.Command.UserInterface.Extensions.Set({ ConfigId: 'default' }, interfaces.get(hostname));
                    console.log(`Custom UI applied to ${hostname}`);
                    return;
            } 
        }
    }
}

//FIX THIS FUNCTION
//Check if customUi is true
//then check if a file exists..
    //if yes.. push to device..
    //if no.. log
    //(look into fs writing the file to set false to avoid contant errors)