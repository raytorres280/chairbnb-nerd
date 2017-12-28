const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
	start_date: {
		type: Sequelize.DATE
	},
	end_date: {
		type: Sequelize.DATE
	},
  days_rented: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  coupon: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

module.exports = Order
