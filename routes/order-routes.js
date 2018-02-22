const express = require('express')
const orderRoutes = express.Router()

const ordersController = require('../controllers/orders-controller')

orderRoutes.get('/', ordersController.indexLedger)

module.exports = orderRoutes
