const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  street2: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  city: {
    type: Sequelize.STRING(255)
  },
  state: {
    type: Sequelize.STRING(2)
  },
  zip: {
    type: Sequelize.STRING(10)
  },
  rate: {
    type: Sequelize.FLOAT
  },
  avgStars: {
    type: Sequelize.FLOAT
  },
  chair: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
	weight_limit: {
		type: Sequelize.INTEGER
	},
	seating_limit: {
		type: Sequelize.INTEGER
	},
	description: {
		type: Sequelize.STRING
	},
	minimum_stay_length: {
		type: Sequelize.INTEGER
	},
	has_food: {
		type: Sequelize.BOOLEAN
	},
	has_tv: {
		type: Sequelize.BOOLEAN
	},
	has_wifi: {
		type: Sequelize.BOOLEAN
	},
	check_in: {
		type: Sequelize.DATE
	},
	check_out: {
		type: Sequelize.DATE
	}
})

module.exports = Location
