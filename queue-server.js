'use strict'

//3rd party dependencies
const io = require('socket.io-client');

//internal modules
const Queue = require('./queue.js');

//configure .env variables
require('dotenv').config()
 let port = process.env.PORT;

 //configure host route
 let host =`http://localhost:${port}`;

//create message queues
let pickUpQ = new Queue('pick-up');
let inTransitQ = new Queue('in-transit');
let deliveredQ = new Queue('delivered');

const socket = io.connect(`${host}/caps`);

socket.on('received', messageReceived);
socket.on('getAll', getAllMsgs)
socket.on('new-deliveryMsg', deliveryMessage)

function messageReceived(payload){

}

function getAllMsgs(payload){  
  let index = 0;
  let message = null;
  if(payload.type === 'delivered'){   
    console.log(deliveredQ.isEmpty());     
    while(deliveredQ.isEmpty() === false){
      console.log('getAllMsgs RUNING');
      message = deliveredQ.dequeue();
      socket.emit('return-messages', { type:'delivered', details:message });
    }
  }
}

function deliveryMessage(payload){
  //place the order details in the proper message queue
  deliveredQ.enqueue(payload);
  console.log('Messages in storage----------------------->', deliveredQ.storage.length);
}