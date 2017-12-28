const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  first: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  last: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
    notEmpty: true
  },
  dob: {
    type: Sequelize.DATE
  }
})

module.exports = User
