const bcrypt = require('bcrypt')

exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: "admin", password: bcrypt.hashSync("admin", 16) },
        { username: "testuser", password: bcrypt.hashSync("test", 16) }
      ])
    })
}