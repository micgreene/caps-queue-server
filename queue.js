'use strict';

const EventMessage = require('./event-message.js');

class Queue {
  constructor(eventType) {
    this.type = eventType;
    this.front = null;
    this.back = null;
    this.storage = new Array();
  }

  enqueue(details) {
    let message = new EventMessage(details);

    this.storage.push(message);
    if (this.storage.length === 1) {
      this.front = message;
      this.rear = message;
    } else{
      this.rear = message;
    }    
  }

  dequeue() {
    if (this.storage.length < 1) {
      return 'No Messages!';
    }

    //assigns item as first item in the array to dequeue
    let message = this.storage.shift();

    //if we removed the last item, reset all properties to null
    if (this.storage.length < 1) {
      this.front = null;
      this.rear = null;
    }
    //if not, then we'll set the front and rear to their actual positions in the array
    else {
      this.front = this.storage[0];
      this.rear = this.storage[this.storage.length - 1];
    }
    console.log('Messages in storage----------------------->', this.storage.length);
    return message;
  }

  peek(){
    if(this.storage.length < 1){
      return 'No Messages!';
    } else{
      return this.front;
    }
  }

  isEmpty(){
    let empty = true;
    if(!this.front){
      return empty;
    } else {
      empty = false;
      return empty;
    }
  }
}

module.exports = Queue;
