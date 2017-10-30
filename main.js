let device;

addEventListener( 'load', e => {
    mobileConsole.init();
} );

document.querySelector( 'button' ).addEventListener( 'click', e => {
    console.log( 'click' );


    navigator.bluetooth.requestDevice( {
            // acceptAllDevices: true
            filters: [
                {
                    name: 'test'
                }
            ]
        } )
        .then( _device => {
            device = _device;
            console.log( device );
            console.log( 'id: ' + device.id );
            console.log( 'name: ' + device.name );
        } )
        .catch( error => {
            console.log( error );
        } )
} )
