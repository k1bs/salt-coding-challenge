const bcrypt = require('bcryptjs')

function comparePass (userPass, databasePass) {
  return bcrypt.compareSync(userPass, databasePass)
}

module.exports = {
  comparePass
}
