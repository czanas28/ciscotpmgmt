require("dotenv").config(); //Stores confidential data and global variables
const Service = require('node-windows').Service;
const EventLogger = require('node-windows').EventLogger;
const { devices } = require('./maps/devices');
const { functions } = require('./maps/functions');
const { reachable } = require("./maps/reachable");
const { connected } = require('./maps/connected');

const svc = new Service({
    name: 'Cisco Telepresence Management',
    description: 'This service manages the Cisco Telepresence Management custom application.',
    script: require('path').join(__dirname,'index.js'),
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
      ],
    wait: 2,
    grow: .5,
    maxRestarts: 5,
    allowServiceLogon: true,
})

svc.logOnAs.domain = 'court13';
svc.logOnAs.account = 'zanasc';
svc.logOnAs.password = 'rOdwopm070046';

let log = new EventLogger('Cisco TP Mgmt');

log.info('Info');
log.warn('Warning');
log.error('Error!');

//Ping each device
devices.forEach((device) => {
    functions.get('heartbeat').execute(device.name);
});

setInterval(() => {
    devices.forEach((device) => {
        let hostname = devices.get(device.name).name;
        //If the device is connected, ignore it and move on
        if (connected.has(hostname)) {
            return;
        }
        //Connect to each device that can be pinged
        else if (reachable.get(hostname) === true) {
            functions.get('connect').execute(hostname, device);
        }
        //If the device is not connected, ping it
        else {
            functions.get('heartbeat').execute(hostname);
        }
    })
}, 5000)

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
  });
   
  svc.install();