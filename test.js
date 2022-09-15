// example.js
const xevEmitter = require('xev-emitter')(process.stdin);
xevEmitter.on('KeyPress', (key) => {
    console.log(key, 'was pressed')
})
 
xevEmitter.on('KeyRelease', (key) => {
    console.log(key, 'was released')
})