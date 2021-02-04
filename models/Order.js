const mongoose = require('mongoose')
const Cart = require('./Cart')
var moment = require('moment');

OrderSchema = mongoose.Schema({
    orderStatus: {
        type: Boolean
    },
    paymentMethod: {
        type: String
    },
    paymentStatus: {
        type: Boolean
    },
    cartId: {
        type: String
    },
    userId: {
        type: String
    },
    addressId: {
        type: String
    },
    priority: {
        type: String
    },
    shippingType: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    orderLevel: {
        type: Number
    },
    orderStatus: {
        type: String
    },
    createDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    comments: {
        type: Array
    }
})

var Order = module.exports = mongoose.model('Order', OrderSchema)
//get order by id
module.exports.getOrderById = function (id, callback) {
    Order.find({ '_id': id }, callback);
}

// add order
module.exports.addOrder = function (data, callback) {
    data['createDate'] = moment(new Date()).format('YYYY-MM-DD h:mm:ss a')
    let newOrder = new Order(data)
    newOrder.save(callback)
}

//fetch new tickets
module.exports.fetchNewOrders = function (callback) {
    Order.find({ "orderStatus": 'New', 'orderLevel': 0 }, callback);
}

//update order
module.exports.updateOrder = function (data, callback) {
    console.log('INFO - updateOrder')
    var query = { '_id': data._id, 'userId': data.userId };
    Order.findOneAndUpdate(query, data, { upsert: true }, callback);
}

//get active order
module.exports.fetchActiveOrders = function (id, callback) {
    var query = { 'userId': id, orderLevel: { "$nin": 4 } };
    Order.find(query, callback);
}

module.exports.fetchAllActiveOrders = function (callback) {
    var query = { orderLevel: { "$nin": 4 } };
    Order.find(query, callback);
}


//get order history
module.exports.fetchOrderHistory = function (id, callback) {
    var query = { 'userId': id, orderLevel: { "$in": 4 } };
    Order.find(query, callback);
}

module.exports.getOrdersCount = function (callback){
    var query = { orderLevel: { "$nin": 4 } };
    Order.countDocuments(query, callback);
}



