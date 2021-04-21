const axios = require('axios');
const jwt = require('jsonwebtoken');
const { variables } = require('../maps/variables');

//Creates a JWT for Zoom API requests
const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_API_SECRET);

//Creates the Zoom API module
const zoom = axios.create({
    baseURL: process.env.ZOOM_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        }
});

module.exports = {
    name: 'zoom',
    desc: 'Connects to the Zoom API',
    async execute(hostname, widgetId) {
        const res = await zoom.get(`meetings/${widgetId}`);
        variables.set(`${hostname}${widgetId}uri`, res.data.id);
        variables.set(`${hostname}${widgetId}passcode`, res.data.password);
    },
    async listenToCalls(callId, hostname) {
        const res = await zoom.get(`meetings/${callId}`); //Uses the meeting ID to query additional details
        variables.set(`${hostname}${callId}hostEmail`, res.data.host_email); //Grabs the host_email for authorization
        variables.set(`${hostname}${callId}pin`, res.data.password); // Grabs the password to send when a call connects
    }
}