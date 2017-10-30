addEventListener( 'load', e => {
    mobileConsole.init();
} );

document.querySelector( 'button' ).addEventListener( 'click', e => {
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
        } )
        .catch( error => {
            console.log( error );
        } )
} )
