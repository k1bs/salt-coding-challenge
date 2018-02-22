const Order = require('../models/Order')

const orderController = {}

orderController.indexLedger = (req, res, next) => {
  Order.indexByUserId(req.user.id)
    .then((orders) => {
      let balances = orders.reduce((balanceObj, order) => {
        balanceObj[order.from_curr] -= parseInt(order.from_amt)
        balanceObj[order.to_curr] += parseInt(order.to_amt)
        return balanceObj
      }, {
        USD: 10000,
        BTC: 0,
        LTC: 0,
        DOGE: 0,
        XMR: 0
      })
      console.log(orders)
      res.status(200).json({
        message: 'ok',
        data: {
          orders,
          balances
        }
      })
    }).catch(next)
}

orderController.create = (req, res, next) => {
  Order.create({
    fromCurr: req.body.from_curr,
    fromAmt: req.body.from_amt,
    toCurr: req.body.to_curr,
    toAmt: req.body.to_amt
  }, req.user.id)
    .then((order) => {
      res.status(201).json({
        message: 'order created successfully',
        data: {
          order
        }
      })
    }).catch(next)
}

module.exports = orderController
