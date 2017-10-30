let device;

addEventListener('load', e => {
    mobileConsole.init();
});

document.querySelector('button').addEventListener('click', e => {
    console.log('click');
    var bluetoothDevice;

    function onButtonClick() {
        bluetoothDevice = null;
        log('Requesting any Bluetooth Device...');
        navigator.bluetooth.requestDevice({
            // filters: [...] <- Prefer filters to save energy & show relevant devices.
            // acceptAllDevices: true
            filters: [ { name: 'CC41-A' } ]
        }).then(device => {
            bluetoothDevice = device;
            bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
            connect();
        }).catch(error => {
            log('Argh! ' + error);
        });
    }

    function connect() {
        exponentialBackoff(3,
        /* max retries */
        2,
        /* seconds delay */
        function toTry() {
            console.log('Connecting to Bluetooth Device... ');
            return bluetoothDevice.gatt.connect();
        }, function success() {
            console.log('> Bluetooth Device connected. Try disconnect it now.');

            bluetoothDevice.writeDataArray(new Uint8Array([0]), '0000ffe0-0000-1000-8000-00805f9b34fb');
        }, function fail() {
            console.log('Failed to reconnect.');
        });
    }

    function onDisconnected() {
        console.log('> Bluetooth Device disconnected');
        connect();
    }

    /* Utils */

    // This function keeps calling "toTry" until promise resolves or has
    // retried "max" number of times. First retry has a delay of "delay" seconds.
    // "success" is called upon success.
    function exponentialBackoff(max, delay, toTry, success, fail) {
        toTry().then(result => success(result)).catch(_ => {
            if (max === 0) {
                return fail();
            }
            console.log('Retrying in ' + delay + 's... (' + max + ' tries left)');
            setTimeout(function() {
                exponentialBackoff(--max, delay * 2, toTry, success, fail);
            }, delay * 1000);
        });
    }

    function time(text) {
        log('[' + new Date().toJSON().substr(11, 8) + '] ' + text);
    }
})
