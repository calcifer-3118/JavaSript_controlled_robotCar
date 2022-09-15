const {Motor, Board, Led, Proximity, Servo } = require('johnny-five');
const configs = Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
var keypress = require('keypress');
require('events').EventEmitter.defaultMaxListeners = Infinity; 

const board = new Board({port: 'COM3'})

board.on("ready", () => {
  
  
    const rightMotor1 = new Motor(configs.M2);
    const rightMotor2 = new Motor(configs.M3);
    const leftMotor1 = new Motor(configs.M1);
    const leftMotor2 = new Motor(configs.M4);

    const light = new Led(8);
    
    const servo = new Servo({
      pin:10,
      type:'continous',
      range: [ 0, 120 ]
    });
    servo.isMoving = false;
    
    const proximity = new Proximity({
      controller: "HCSR04",
      pin: 7
    });

  
    
    rightMotor1.stop();
    rightMotor2.stop();
    leftMotor1.stop();
    leftMotor2.stop();

    
    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);
    process.stdin.resume(); 


    process.stdin.on('keypress', function (ch) {
      if (ch == 'w') {
        rightMotor1.forward(255);
        rightMotor2.forward(255);
        leftMotor1.forward(255);
        leftMotor2.forward(255);
      }
      else if (ch == 's') {

        rightMotor1.reverse(255);
        rightMotor2.reverse(255);
        leftMotor1.reverse(255);
        leftMotor2.reverse(255);
      }
      else if (ch == 'a') {
        rightMotor1.forward(255);
        rightMotor2.forward(255);
        leftMotor1.reverse(255);
        leftMotor2.reverse(255);
      }
      else if (ch == 'd') {
        rightMotor1.reverse(255);
        rightMotor2.reverse(255);
        leftMotor1.forward(255);
        leftMotor2.forward(255);
      }
      else{
        rightMotor1.stop();
        rightMotor2.stop();
        leftMotor1.stop();
        leftMotor2.stop();
      }

    });

  


    proximity.on('change', (centimeters)=>{

      if(centimeters.cm >= 8)
      {
        servo.stop();

        process.stdin.resume(); 

        light.stop();
        light.off();
      } 
      else{
        servo.sweep();
        setTimeout(()=>{
          servo.stop();
        }, 5000)
        
        rightMotor1.stop();
        rightMotor2.stop();
        leftMotor1.stop();
        leftMotor2.stop();
        
        light.on();
        light.blink();
        process.stdin.pause();
      }

      process.stdin.resume(); 

    })


  
  
  
 
});
