module.exports = {
    name: 'listenToGui',
    desc: 'Listens to event from the endpoints GUI',
    execute(xapi, hostname) {

        const { devices } = require('../maps/devices');
        const { apis } = require('../maps/apis');
        const { variables } = require('../maps/variables');
        const { functions } = require('../maps/functions');

        xapi.Event.UserInterface.Extensions.Panel.on(async (event) => {
            if (devices.has(event.Clicked.PanelId)) { 
                await functions.get('callStatus').execute(event.Clicked.PanelId);
                setTimeout(() => {
                    let status = variables.get('callStatus');
                    if (status === false) {
                        functions.get('alert').execute(xapi, 'Call Status', 'The system is NOT on a call');
                        variables.delete('callStatus');
                    } else {
                        functions.get('alert').execute(xapi, 'Call Status', 'The system is on a call');
                        variables.delete('callStatus');
                    }
                }, 1000)
            }
        });

        xapi.Event.UserInterface.Extensions.Widget.Action.on((event) => {
            let widgetId = event.WidgetId;
            let cmsMatch = widgetId.match(/cms/);
            let zoomMatch = widgetId.match(/zoom/);
            let path = '';
            if (cmsMatch) {
                path = cmsMatch[0];
            } else if (zoomMatch) {
                path = zoomMatch[0];
            } else {
                path = undefined;
                console.log('No path');
            }
            if (event.Type === 'clicked' && apis.has(path)) {
                widgetId = widgetId.substring(widgetId.indexOf(".") + 1);
                apis.get(path).execute(hostname, widgetId);
                setTimeout(() => {
                    let domain = '';
                    cmsMatch ? domain = process.env.CMS_DOMAIN : domain = process.env.ZOOM_DOMAIN;
                    functions.get('dial').execute(xapi, variables.get(`${hostname}${widgetId}uri`), domain);
                }, 1000)
                setTimeout(() => {
                    functions.get('sendTouchTones').execute(xapi, variables.get(`${hostname}${widgetId}passcode`));
                }, 2000)
            } 
        })
    }
}