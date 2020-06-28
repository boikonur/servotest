// Obtain configured Bluetooth Terminal instance
let terminal = new BluetoothTerminal();

// Override `receive` method to log incoming data to the terminal
terminal.receive = function(data) {
    console.log(data, 'in');
};

// Override default log method to output messages to the terminal and console
terminal._log = function(...messages) {
    // We cannot use `super._log()` here
    messages.forEach(message => {
        let p = document.createElement('p')
        p.innerText = message;
        document.body.appendChild(p);
    });
};

// Bind event listeners to the UI elements
let connectButton = document.getElementById('connect');
connectButton.addEventListener('click', function() {
    terminal.connect().then(() => {
        console.log( `connected to ${terminal.getDeviceName()}`)
    });
});

let disconnectButton = document.getElementById('disconnect');
disconnectButton.addEventListener('click', function() {
    terminal.disconnect();
    console.log( 'disconnected' );
});

// Implement own send function to log outcoming data to the terminal
function send(data) {
    terminal.send(data).then(() => console.log(data, 'out')).catch(error => console.log(error));
}
document.querySelectorAll( '.cmd' ).forEach( d => d.addEventListener( "input", e => {
    console.log( d.id + ":" + d.value);
    send( d.id + ":" + d.value);
} ) );

document.getElementById("test").addEventListener("click", e => {
    console.log("test button");
    send(500);
});

addEventListener('load', e => {
    mobileConsole.init();
    console.log('v0.3');
    console.log('sw.js back');
});
