addEventListener('load', e => {
    mobileConsole.init();

    document.querySelector('button').addEventListener('click', e => {
        console.log('click');
        console.log( BluetoothTerminal );
        // Obtain configured instance
        let terminal = new BluetoothTerminal();

        // Override `receive` method to handle incoming data as you want
        terminal.receive = function(data) {
            console.log(data);
        };

        // Request the device for connection and get its name after successful connection
        terminal.connect().then(() => {
            console.log(terminal.getDeviceName() + ' is connected!');
            // Send something to the connected device
            terminal.send('Simon says: Hello, world!');
        });
    });
});
