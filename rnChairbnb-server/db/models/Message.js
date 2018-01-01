const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING(255),
    defaultValue: false
  },
	sent_from: {
		type: Sequelize.ENUM('user', 'host')
	},
})

module.exports = Message
