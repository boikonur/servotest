#include <SoftwareSerial.h>
#define LED_PIN 13

SoftwareSerial bluetooth(8, 7); // RX, TX
// Connect HM10      Arduino Uno
//     Pin 1/TXD      Pin 8
//     Pin 2/RXD      Pin 7
long baudrate[13] = { 300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 74880, 115200, 230400 };
void testAllBaudRates() {
    for (int j = 0; j < 13; j++) {
        bluetooth.begin(baudrate[j]);
        delay(100);
        Serial.println("baudRate " + String(baudrate[j], DEC) + " i-> " + String(j, DEC));
        // Serial.println("");
        bluetooth.println("AT");
        delay(500);
        while ( bluetooth.available() ) {
            Serial.print( bluetooth.read() );
        }
        delay( 100 );
    }
}

void setup() {
    pinMode(LED_PIN, OUTPUT);
    Serial.begin(9600);
    // If the baudrate of the HM-10 module has been updated,
    // you may need to change 9600 by another value
    // Once you have found the correct baudrate,
    // you can update it using AT+BAUDx command
    //testAllBaudRates();
    bluetooth.begin(9600);
    // bluetooth.println( "AT+RENEW" );
}

void loop() {
    while ( Serial.available() ) {
        char c = Serial.read();
        bluetooth.print( c );
    }

    while ( bluetooth.available() ) {
        char c = bluetooth.read();
        Serial.print( c );
        // if (c != '0') {
        //     // Non-zero input means "turn on LED".
        //     Serial.println("  on");
        //     digitalWrite(LED_PIN, HIGH);
        // }
        // else {
        //     // Input value zero means "turn off LED".
        //     Serial.println("  off");
        //     digitalWrite(LED_PIN, LOW);
        // }
    }
}
