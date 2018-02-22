const db = require('../db/config')

const Order = {}

Order.indexByUserId = (userId) => (
  db.manyOrNone(`
    SELECT * FROM orders
    WHERE user_id = $1
  `, [userId])
)

Order.create = (order, userId) => (
  db.oneOrNone(`
    INSERT INTO orders
    (ts, from_curr, from_amt, to_curr, to_amt, user_id)
    VALUES (current_timestamp, $1, $2, $3, $4, $5)
    RETURNING *
  `, [order.fromCurr, order.fromAmt, order.toCurr, order.toAmt, userId])
)

module.exports = Order
