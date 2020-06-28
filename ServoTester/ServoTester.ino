#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
//#include<Timer.h>

#define SERVOMIN  150 // This is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  600 // This is the 'maximum' pulse length count (out of 4096)
#define USMIN  600 // This is the rounded 'minimum' microsecond length based on the minimum pulse of 150
#define USMAX  2400 // This is the rounded 'maximum' microsecond length based on the maximum pulse of 600
#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates

#define LED_PIN 13
#define BT_INT_PIN 2

#define BTSerial Serial1
String inString = "";
boolean Connecting = false;
boolean Connected = false;
boolean on = false;
String message = "";
int count = 0;

// called this way, it uses the default address 0x40
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
//Timer t;



/*Default parameter configuration for factory
  1：Communication mode: UART （SELECT pin hanging）
  2：Serial port baud rate: 9600 （AT+BAUD4）
  3：Sleep mode: boot sleep, connection wake up （AT+STARTEN1）
  4：Broadcast name: JDY-16 （AT+NAMEJDY-16）
  5：Broadcast interval: 200MS （AT+ADVIN2）
  6：Master slave mode: slave transparent transmission （AT+MASTEREN0）
  7 ： Output status: connection or disconnection status output from serial port
  （AT+ENLOG1）
  8：Broadcast LED indicator pin open （AT+ALED1）
  If the default configuration parameters above cannot meet
*/

void setup() {

  pinMode(BT_INT_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  BTSerial.begin(9600);
  Serial.println("Init");

  pwm.begin();
  // In theory the internal oscillator is 25MHz but it really isn't
  // that precise. You can 'calibrate' by tweaking this number till
  // you get the frequency you're expecting!
  pwm.setOscillatorFrequency(27000000);  // The int.osc. is closer to 27MHz
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates


  // t.every(100, takeReading);
  Serial.println("AT+RST");
  delay(500);
  BTSerial.println("AT");
  delay(10);
}

void loop() {
  if (BTSerial.available()) {
    inString = BTSerial.readStringUntil('\n');
    inString.trim(); // Trim whitespace
    Serial.println(inString);


    if (inString == "+CONNECTED") {
      Connected = true;
      Connecting = false;
      digitalWrite(LED_PIN, HIGH);
    }
    else if (inString == "+DISCONNECTED") {
      Connected = false;
      digitalWrite(LED_PIN, LOW);
    }
    else if (1){

        if (inString.startsWith("ss")) {
          String dataInS = inString.substring(2, inString.length());
          int servoAngle = dataInS.toInt();
          Serial.print("GO ");
          Serial.println(servoAngle);
          pwm.setPWM(0, 0, servoAngle);
        }

        
     }
  }

  if (Serial.available()) {
    BTSerial.write(Serial.read());
  }
}

void SetServo( int numServo) {
  for (uint16_t pulselen = SERVOMIN; pulselen < SERVOMAX; pulselen++) {
    pwm.setPWM(numServo, 0, pulselen);
  }
}


void takeReading() {

}
