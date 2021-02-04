const mongoose = require('mongoose')

AddressSchema = mongoose.Schema({
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    landMark: {
        type: String
    },
    addressType: {
        type: String
    },
    defaultStatus: {
        type: Boolean
    },
    state: {
        type: String
    },
    userId: {
        type: String
    }
})

var Address = module.exports = mongoose.model('Address', AddressSchema)

module.exports.addAddress = function (data, callback) {
    console.log('[INFO] addAddress', data)
    let newAddress = new Address(data)
    newAddress.save(callback)
}

module.exports.getAllAddress = function (query, callback) {
    Address.find(query, callback)
}

module.exports.getAddressesByUserId = function (id, callback) {
    Address.find({ "userId": id }, callback)
}

module.exports.getAddressesById = function (id, callback) {
    Address.find({ "_id": id }, callback)
}

module.exports.updateAddress = function (data, callback) {
    var query = { '_id': data._id, 'userId': data.userId };
    Address.findOneAndUpdate(query, data, { upsert: true }, callback);
}