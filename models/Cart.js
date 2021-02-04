
const mongoose = require('mongoose')

CartSchema = mongoose.Schema({
  items: {
    type: Object
  },
  totalQty: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  shippingFee:{
    type: Number
  },
  userId: {
    type: String
  },
  active: {
    type: Boolean
  }
})

var Cart = module.exports = mongoose.model('Cart', CartSchema)

module.exports.getCartByUserId = function (uid, callback) {
  let query = { userId: uid, active: true }
  Cart.find(query, callback)
}

module.exports.getCartById = function (id, callback) {
  Cart.findById(id, callback)
}

module.exports.updateCartByUserId = function (userId, newCart, callback) {
  let query = { userId: userId, active: true }
  Cart.find(query, function (err, c) {
    if (err) throw err

    //exist cart in databse
    if (c.length > 0) {
      Cart.findOneAndUpdate(
        { userId: userId, active: true },
        {
          $set: {
            items: newCart.items,
            totalQty: newCart.totalQty,
            totalPrice: newCart.totalPrice,
            userId: userId
          }
        },
        { new: true },
        callback
      )
    } else {
      //no cart in database
      newCart.save(callback)
    }
  })
}

module.exports.updateCartByCartId = function (cartId, newCart, callback) {
  Cart.findById(
    { _id: cartId },
    {
      $set: newCart
    },
    callback
  )
}

module.exports.createCart = function (newCart, callback) {
  newCart.save(callback)
}

module.exports.updateOrderCart = function (id, callback) {
  console.log('[INFO] :: updateOrderCart')
  let query = { _id: id, active: true }
  Cart.findOneAndUpdate(query, { $set: { active: false } }, { new: true }, callback);
}




