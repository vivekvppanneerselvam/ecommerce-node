var express = require('express');
var router = express.Router();
const ensureAuthenticated = require('../modules/ensureAuthenticated')
const Product = require('../models/Product')
const Variant = require('../models/Variant')
const Department = require('../models/Department')
const Category = require('../models/Category')
const Address = require('../models/Address')
const Order = require('../models/Order')
const TypedError = require('../modules/ErrorHandler')
const Cart = require('../models/Cart');
const CartClass = require('../modules/Cart')
const paypal_config = require('../configs/paypal-config')
const paypal = require('paypal-rest-sdk')
const Mail = require('../models/Mail')
const Image = require('../models/Image')
const User = require('../models/User')
const MailTemplates =require('../configs/mailTemplates')
var env = require('../configs/envConfig')

//GET /products
router.get('/products', function (req, res, next) {
  const { query, order } = categorizeQueryString(req.query)
  Product.getAllProducts(query, order, function (e, products) {
    if (e) {
      e.status = 406; return next(e);
    }
    if (products.length < 1) {
      return res.status(404).json({ message: "products not found" })
    }
    res.json({ products: products })
  })
});

//GET /products/:id
router.get('/products/:id', function (req, res, next) {
  let productId = req.params.id;
  Product.getProductByID(productId, function (e, item) {
    if (e) {
      e.status = 404; return next(e);
    }
    else {
      res.json({ product: item })
    }
  });
});


//GET /variants
router.get('/variants', function (req, res, next) {
  let { productId } = req.query
  if (productId) {
    Variant.getVariantProductByID(productId, function (err, variants) {
      if (err) return next(err)
      return res.json({ variants })
    })
  } else {
    Variant.getAllVariants(function (e, variants) {
      if (e) {
        if (err) return next(err)
      }
      else {
        return res.json({ variants })
      }
    })
  }
})

//GET /variants/:id
router.get('/variants/:id', ensureAuthenticated, function (req, res, next) {
  let id = req.params.id
  if (id) {
    Variant.getVariantByID(id, function (err, variants) {
      if (err) return next(err)
      res.json({ variants })
    })
  }
})

//GET /departments
router.get('/departments', function (req, res, next) {
  Department.getAllDepartments(req.query, function (err, d) {
    if (err) return next(err)
    res.status(200).json({ departments: d })
  })
})

//POST /departments
router.post('/departments', function (req, res, next) {
  Department.addDepartment(req.body, function (err, d) {
    if (err) return next(err)
    res.status(200).json({ departments: d })
  })
})

//POST /edit_department 
router.post('/edit_department', function (req, res, next) {
  Department.editDepartment(req.body, function (err, d) {
    if (err) return next(err)
    res.status(200).json({ departments: d })
  })
})

//GET /categories
router.get('/categories', function (req, res, next) {
  Category.getAllCategories(function (err, c) {
    if (err) return next(err)
    res.json({ categories: c })
  })
})

//POST /categories
router.post('/categories', function (req, res, next) {
  Category.addCategory(req.body, function (err, d) {
    if (err) return next(err)
    res.status(200).json({ categories: d })
  })
})

//POST /product
router.post('/product', function (req, res, next) {
  const file = req.files.image;
  console.log(file);
  Image.imageUpload(file.tempFilePath, function (err, result) {
    console.log(err)
    if (err) return next(err)
    req.body['imagePath'] = result.url
    Product.addProduct(req.body, function (err, d) {
      if (err) return next(err)
      res.status(200).json({ product: d })
    })
  })
})

//POST /edit_product
router.post('/edit_product', function (req, res, next) {
  Product.editProduct(req.body, function (err, d) {
    if (err) return next(err)
    res.status(200).json({ product: d })
  })
})

//GET /Addresses by user id
router.get('/addresses', function (req, res, next) {
  Address.getAddressesByUserId(req.query.userId, function (err, c) {
    if (err) return next(err)
    res.json({ addresses: c })
  })
})

// GET /address by id
router.get('/address', function (req, res, next) {
  Address.getAddressesById(req.query.id, function (err, c) {
    if (err) return next(err)
    res.json({ address: c })
  })
})

//POST /Address
router.post('/addresses', function (req, res, next) {
  Address.addAddress(req.body, function (err, c) {
    if (err) return next(err)
    res.json({ addresses: c })
  })
})


//POST /Address
router.post('/update_address', function (req, res, next) {
  Address.updateAddress(req.body, function (err, c) {
    if (err) return next(err)
    res.json({ addresses: c })
  })
})


//GET /Order
router.get('/order', function (req, res, next) {
  Order.getOrderById(req.query.id, function (err, c) {
    if (err) return next(err)
    res.json({ order: c })
  })
})

//GET /cart
router.get('/cart', function (req, res, next) {
  Cart.getCartById(req.query.id, function (err, c) {
    if (err) return next(err)
    res.json({ cart: c })
  })
})

//POST /order
router.post('/order', function (req, res, next) {
  Order.addOrder(req.body, function (err, order) {
    if (err) return next(err)
    console.log('[INFO] -addOrder', order)
    Cart.updateOrderCart(order.cartId, function (err, cart) {
      if (err) return next(err)
      res.send({ order: order })
    })
  })
})


//POST /update order
router.post('/update_order', function (req, res, next) {
  Order.updateOrder(req.body, function (err, c) {
    if (err) return next(err)
    res.json({ order: c })
  })
})

// GET active orders
router.get('/active_order', function (req, res, next) {
  Order.fetchActiveOrders(req.query.id, function (err, c) {
    if (err) return next(err)
    res.json({ order: c })
  })
})

router.get('/all_active_orders', function (req, res, next) {
  Order.fetchAllActiveOrders(function (err, c) {
    if (err) return next(err)
    res.json({ order: c })
  })
})



//GET order history
router.get('/order_history', function (req, res, next) {
  Order.fetchOrderHistory(req.query.id, function (err, c) {
    if (err) return next(err)
    res.json({ order: c })
  })
})
//GET user count
router.get('/user_count', function (req, res, next) {
  User.getUsersCount(function (err, c) {
    if (err) return next(err)
    res.send({count:c})
  })
})

// GET order count
router.get('/order_count', function (req, res, next) {
  Order.getOrdersCount(function (err, c) {
    if (err) return next(err)
    res.send({count:c})
  })
})



// trigger mail
router.get('/send_mail', function (req, res, next) {
  const mailOptions = {
    from: "info.darkthoughts@gmail.com",
    to: "vvkslv3@gmail.com",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: MailTemplates.orderTemplate({order:'haha'})
  };
  Mail.sendMail(mailOptions, function (err, c) {
    if (err) return next(err)
    res.json({ mail: c })
  })
})


// upload image
router.post('/upload_image', function (req, res, next) {
  const file = req.files.photo;
  console.log(file);
  Image.imageUpload(file.tempFilePath, function (err, result) {
    console.log(err)
    if (err) return next(err)
    res.send({ success: true, result })
  })
})





//GET /search?
router.get('/search', function (req, res, next) {
  const { query, order } = categorizeQueryString(req.query)
  query['department'] = query['query']
  delete query['query']
  Product.getProductByDepartment(query, order, function (err, p) {
    if (err) return next(err)
    if (p.length > 0) {
      return res.json({ products: p })
    } else {
      query['category'] = query['department']
      delete query['department']
      Product.getProductByCategory(query, order, function (err, p) {
        if (err) return next(err)
        if (p.length > 0) {
          return res.json({ products: p })
        } else {
          query['title'] = query['category']
          delete query['category']
          Product.getProductByTitle(query, order, function (err, p) {
            if (err) return next(err)
            if (p.length > 0) {
              return res.json({ products: p })
            } else {
              query['id'] = query['title']
              delete query['title']
              Product.getProductByID(query.id, function (err, p) {
                let error = new TypedError('search', 404, 'not_found', { message: "no product exist" })
                if (err) {
                  return next(error)
                }
                if (p) {
                  return res.json({ products: p })
                } else {
                  return next(error)
                }
              })
            }
          })
        }
      })
    }
  })
})

// GET filter
router.get('/filter', function (req, res, next) {
  let result = {}
  let query = req.query.query
  Product.filterProductByDepartment(query, function (err, p) {
    if (err) return next(err)
    if (p.length > 0) {
      result['department'] = generateFilterResultArray(p, 'department')
    }
    Product.filterProductByCategory(query, function (err, p) {
      if (err) return next(err)
      if (p.length > 0) {
        result['category'] = generateFilterResultArray(p, 'category')
      }
      Product.filterProductByTitle(query, function (err, p) {
        if (err) return next(err)
        if (p.length > 0) {
          result['title'] = generateFilterResultArray(p, 'title')
        }
        if (Object.keys(result).length > 0) {
          return res.json({ filter: result })
        } else {
          let error = new TypedError('search', 404, 'not_found', { message: "no product exist" })
          return next(error)
        }
      })
    })
  })
})

//GET /checkout
router.get('/checkout/:cartId', ensureAuthenticated, function (req, res, next) {
  const cartId = req.params.cartId
  //const frontURL = 'https://zack-ecommerce-reactjs.herokuapp.com'
  const frontURL = env.frontURL

  Cart.getCartById(cartId, function (err, c) {
    if (err) return next(err)
    if (!c) {
      let err = new TypedError('/checkout', 400, 'invalid_field', { message: 'cart not found' })
      return next(err)
    }
    const items_arr = new CartClass(c).generateArray()
    const paypal_list = []
    for (const i of items_arr) {
      paypal_list.push({
        "name": i.item.title,
        "price": i.item.price,
        "currency": "CAD",
        "quantity": i.qty
      })
    }
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": frontURL + '/success_page',
        "cancel_url": frontURL + '/cancel_page'
      },
      "transactions": [{
        "item_list": {
          "items": paypal_list
        },
        "amount": {
          "currency": "CAD",
          "total": c.totalPrice
        },
        "description": "This is the payment description."
      }]
    }
    paypal.configure(paypal_config);
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log(JSON.stringify(error));
        return next(error)
      } else {
        console.log(payment);
        for (const link of payment.links) {
          if (link.rel === 'approval_url') {
            res.json(link.href)
          }
        }
      }
    });
  })
})

//GET /payment/success
router.get('/payment/success', ensureAuthenticated, function (req, res, next) {
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(JSON.stringify(error));
      return next(error)
    } else {
      if (payment.state == 'approved') {
        console.log('payment completed successfully');
        console.log(payment);
        res.json({ payment })
      } else {
        console.log('payment not successful');
      }
    }
  })
})

function generateFilterResultArray(products, targetProp) {
  let result_set = new Set()
  for (const p of products) {
    result_set.add(p[targetProp])
  }
  return Array.from(result_set)
}

function categorizeQueryString(queryObj) {
  let query = {}
  let order = {}
  //extract query, order, filter value
  for (const i in queryObj) {
    if (queryObj[i]) {
      // extract order
      if (i === 'order') {
        order['sort'] = queryObj[i]
        continue
      }
      // extract range
      if (i === 'range') {
        let range_arr = []
        let query_arr = []
        // multi ranges
        if (queryObj[i].constructor === Array) {
          for (const r of queryObj[i]) {
            range_arr = r.split('-')
            query_arr.push({
              price: { $gt: range_arr[0], $lt: range_arr[1] }
            })
          }
        }
        // one range
        if (queryObj[i].constructor === String) {
          range_arr = queryObj[i].split('-')
          query_arr.push({
            price: { $gt: range_arr[0], $lt: range_arr[1] }
          })
        }
        Object.assign(query, { $or: query_arr })
        delete query[i]
        continue
      }
      query[i] = queryObj[i]
    }
  }
  return { query, order }
}



module.exports = router;
