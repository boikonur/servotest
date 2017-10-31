addEventListener('load', e => {
    mobileConsole.init();

    console.log( 'v0.10' );

    // Obtain configured instance
    let terminal = new BluetoothTerminal();

    // Override `receive` method to handle incoming data as you want
    terminal.receive = function(data) {
        console.log(data);
    };

    document.querySelector('#connect').addEventListener('click', e => {
        console.log('click');

        // Request the device for connection and get its name after successful connection
        terminal.connect().then(() => {
            console.log(terminal.getDeviceName() + ' is connected!');
        });
    });

    document.querySelector( '#send' ).addEventListener( 'click', e => {
        console.log( 'sending' );
        terminal.send( 'yo BLE' );
    })
});
