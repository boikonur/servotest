addEventListener( 'load', e => {
    mobileConsole.init();
} );

document.querySelector( 'button' ).addEventListener( 'click', e => {
    console.log( 'click' );

    navigator.bluetooth.requestDevice( {
            acceptAllDevices: true
            // filters: [
            //     {
            //         name: 'test'
            //     }
            // ]
        } )
        .then( device => {
            console.log( device );
            console.log( device.name );
            console.log( device.name );
        } )
        .catch( error => {
            console.log( error );
        } )
} )
