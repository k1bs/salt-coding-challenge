const Order = require('../models/Order')

const orderController = {}

orderController.indexLedger = (req, res, next) => {
  Order.indexByUserId(req.user.id)
    .then((orders) => {
      let balances = orders.reduce((balanceObj, order) => {
        balanceObj[order.from_curr] -= parseFloat(order.from_amt)
        balanceObj[order.to_curr] += parseFloat(order.to_amt)
        console.log(balanceObj)
        return balanceObj
      }, {
        USD: 10000,
        BTC: 0,
        LTC: 0,
        DOGE: 0,
        XMR: 0
      })
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
      if (balances[req.body.from_curr] >= req.body.from_amt) {
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
      } else {
        res.status(418).json({
          message: 'Insufficient balance to place order'
        })
      }
    }).catch(next)
}

module.exports = orderController
