const {Motor, Board, Led, Proximity, Servo } = require('johnny-five');
const configs = Motor.SHIELD_CONFIGS.ADAFRUIT_V1; //Configs for L293d motor shield : http://johnny-five.io/api/motor/
require('events').EventEmitter.defaultMaxListeners = Infinity; 


/**
 * Setup
 */
const minDistance = 8;      //minimum distance from the object for the car to stop (in cm)
const arduinoPort = 'COM5'; //port for your board
const ledPin = 8;         
const servoPin = 10;         
const ultrasonicPin = 7;   
let canMove = false;      


//Initialize board with the correct arduino port
const board = new Board({port: arduinoPort })  

board.on("ready", () => {
  
    //Initialize the components  
    const rightMotor1 = new Motor(configs.M2);
    const rightMotor2 = new Motor(configs.M3);
    const leftMotor1 = new Motor(configs.M1);
    const leftMotor2 = new Motor(configs.M4);


    rightMotor1.stop();
    rightMotor2.stop();
    leftMotor1.stop();
    leftMotor2.stop();

    const light = new Led(ledPin);
    
    const servo = new Servo({
      pin:servoPin,
      type:'continous',
      range: [ 0, 120 ]
    });
    servo.isMoving = false;
    
    const proximity = new Proximity({
      controller: "HCSR04",
      pin: ultrasonicPin
    });

  


    /**
     * Keyboard controls
     */
     'use strict';
     const ioHook = require('iohook');
     ioHook.on('keydown', function (data) {
       
      if(canMove){
         switch (data.keycode){

              //W
               case '87': 
                 rightMotor1.forward(255);
                 rightMotor2.forward(255);
                 leftMotor1.forward(255);
                 leftMotor2.forward(255);
                 break;

              //S
               case '83':
                 rightMotor1.rev(255);
                 rightMotor2.rev(255);
                 leftMotor1.rev(255);
                 leftMotor2.rev(255);
                 break;

              //A
               case '65':
                 rightMotor1.rev(255);
                 rightMotor2.rev(255);
                 leftMotor1.fwd(255);
                 leftMotor2.fwd(255);
                 break;
            
              //D
               case '68':
                 rightMotor1.rev(255);
                 rightMotor2.rev(255);
                 leftMotor1.fwd(255);
                 leftMotor2.fwd(255);
                 break;
             }

        }

     });
     ioHook.on('keyup', function () {
        
           rightMotor1.stop();
           rightMotor2.stop();
           leftMotor1.stop();
           leftMotor2.stop();
      
     });



    /**
     * Gameoad Controls
     */
    const Gamecontroller = require('./gamecontroller');
    const gamepad = new Gamecontroller('gamesir_g4s');

     gamepad.connect(function() {
        console.log('Game On!');
    });

     gamepad.on('X:press', function() {
            rightMotor1.forward(255);
            rightMotor2.forward(255);
            leftMotor1.forward(255);
            leftMotor2.forward(255);
    });

     gamepad.on('X:release', function() {
           rightMotor1.stop();
           rightMotor2.stop();
           leftMotor1.stop();
           leftMotor2.stop();
    });

     gamepad.on('B:press', function() {
            console.log('rev')
             rightMotor1.rev(255);
             rightMotor2.rev(255);
             leftMotor1.rev(255);
             leftMotor2.rev(255);

    });

     gamepad.on('B:release', function() {
           rightMotor1.stop();
           rightMotor2.stop();
           leftMotor1.stop();
           leftMotor2.stop();
    });

    gamepad.on('JOYR:move', function(data) {
      const normalizeVal = (val, max, min) => (val - min) / (max - min); 
      const normal_speed = normalizeVal(data.y, 255 , 127)
      const speed = Math.abs(normal_speed) * 255;
      console.log(normal_speed, speed)
          if(normal_speed < 0){
              rightMotor1.fwd(speed);
              rightMotor2.fwd(speed);
              leftMotor1.fwd(speed);
              leftMotor2.fwd(speed);
          }
          else if(normal_speed > 0)
          {
            rightMotor1.rev(speed);
            rightMotor2.rev(speed);
            leftMotor1.rev(speed);
            leftMotor2.rev(speed);
          }
          else
          {
            rightMotor1.stop();
            rightMotor2.stop();
            leftMotor1.stop();
            leftMotor2.stop();
          }
            
    });

    gamepad.on('JOYL:move', function(data) {
      console.log(data.x)
          if(data.x < 128){
              rightMotor1.fwd(255);
              rightMotor2.fwd(255);
              leftMotor1.rev(255);
              leftMotor2.rev(255);
          }
          else if( data.x > 128)
          {
            rightMotor1.rev(255);
            rightMotor2.rev(255);
            leftMotor1.fwd(255);
            leftMotor2.fwd(255);
          }
          else
          {
            rightMotor1.stop();
            rightMotor2.stop();
            leftMotor1.stop();
            leftMotor2.stop();
          }
            
    });


    



  
    // Event to handle the ultrasonic sensor logic, gets called when there is a change in object distance
    proximity.on('change', (centimeters)=>{

      if(centimeters.cm >= minDistance)
      {
        
        canMove = true;
 
        servo.stop();
        console.log('canMove: ' + canMove + '' + centimeters.cm)
 
        light.stop();
        light.off();

      } 

      else{

          canMove = false;

          //sweep sevro for five seconds
           servo.sweep();
           setTimeout(()=>{
             servo.stop();
           }, 5000)
         
           //stop the car
           rightMotor1.stop();
           rightMotor2.stop();
           leftMotor1.stop();
           leftMotor2.stop();
         
           Light Blink (optional)
           light.on();
           light.blink();
      }

    })


  
  
  
 
});
