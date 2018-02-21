const db = require('../db/config')

const User = {}

User.findByUserName = (userName) => (
  db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName])
)

User.create = (user) => (
  db.one(`
    INSERT INTO users
    (username, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.username, user.email, user.password_digest])
)

module.exports = User
