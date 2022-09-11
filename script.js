const {Motor, Board, Led, Proximity, Servo } = require('johnny-five');
const configs = Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
require('events').EventEmitter.defaultMaxListeners = Infinity; 

const board = new Board({port: 'COM5'})

const keyevents = require('key-events') // Also at window.keyevents.
var keys = keyevents() 

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

    


    // process.stdin.on('keypress', function (ch, key) {
    //   if (key.name == 'w') {
    //     rightMotor1.forward(255);
    //     rightMotor2.forward(255);
    //     leftMotor1.forward(255);
    //     leftMotor2.forward(255);
    //   }
    //   else if (key.name == 's') {
    //     rightMotor1.rev(255);
    //     rightMotor2.rev(255);
    //     leftMotor1.rev(255);
    //     leftMotor2.rev(255);
    //   }
    //   else if (key.name == 'd') {
    //     rightMotor1.fwd(255);
    //     rightMotor2.fwd(255);
    //     leftMotor1.rev(255);
    //     leftMotor2.rev(255);
    //   }
    //   else if (key.name == 'a') {
    //     rightMotor1.rev(255);
    //     rightMotor2.rev(255);
    //     leftMotor1.fwd(255);
    //     leftMotor2.fwd(255);
    //   }
    //   if (key.name == 'v') {
    //     rightMotor1.stop();
    //     rightMotor2.stop();
    //     leftMotor1.stop();
    //     leftMotor2.stop();
    //   }
    // });

  


    // proximity.on('change', (centimeters)=>{

    //   if(centimeters.cm >= 8)
    //   {
    //     servo.stop();
    //     // make `process.stdin` begin emitting "keypress" events
    //     keypress(process.stdin);

    //     // listen for the "keypress" event
    //     process.stdin.on('keypress', function (ch, key) {
    //       if (key.name == 'up') {
    //         rightMotor1.forward(255);
    //         rightMotor2.forward(255);
    //         leftMotor1.forward(255);
    //         leftMotor2.forward(255);
    //         process.stdin.pause();
    //       }
    //       else if (key.name == 'down') {
    //         rightMotor1.rev(255);
    //         rightMotor2.rev(255);
    //         leftMotor1.rev(255);
    //         leftMotor2.rev(255);
    //         process.stdin.pause();
    //       }
    //       else if (key.name == 'right') {
    //         rightMotor1.fwd(255);
    //         rightMotor2.fwd(255);
    //         leftMotor1.rev(255);
    //         leftMotor2.rev(255);
    //         process.stdin.pause();
    //       }
    //       else if (key.name == 'left') {
    //         rightMotor1.rev(255);
    //         rightMotor2.rev(255);
    //         leftMotor1.fwd(255);
    //         leftMotor2.fwd(255);
    //         process.stdin.pause();
    //       }
    //       if (key.name == 'space') {
    //         rightMotor1.stop();
    //         rightMotor2.stop();
    //         leftMotor1.stop();
    //         leftMotor2.stop();
    //         process.stdin.pause();
    //       }
    //     });
 
    //     process.stdin.setRawMode(true);
    //     process.stdin.resume(); 

    //     light.stop();
    //     light.off();
    //   } 
    //   else{
    //     servo.sweep();
    //     setTimeout(()=>{
    //       servo.stop();
    //     }, 5000)

    //     rightMotor1.stop();
    //     rightMotor2.stop();
    //     leftMotor1.stop();
    //     leftMotor2.stop();

    //     light.on();
    //     light.blink();
    //   }

    // })


  
  
  
 
});
