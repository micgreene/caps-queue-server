'use strict';

class EventMessage{
  constructor(orderDetails){
    this.storeName = orderDetails.storeName,
    this.orderId = orderDetails.orderId,
    this.customerName = orderDetails.customerName,
    this.address = orderDetails.address
  }
}

module.exports = EventMessage;