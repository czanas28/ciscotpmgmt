module.exports = {
    name: 'alert',
    desc: 'Used to send an alert to the device',
    execute(xapi, title, text, duration = 10) {
        xapi.Command.UserInterface.Message.Alert.Display({
            Title: title,
            Text: text,
            Duration: duration
        })
    }
}