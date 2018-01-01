const router = require('express').Router()
const Message = require('../db/models').Message
const User = require('../db/models').User
const Host = require('../db/models').Host
const Sequelize = require('sequelize')

router.get('/:userId', (req, res) => {
  Message.findAll({
		where: {
			userId: req.params.userId
		},
		include: [
			{
				model: User
			},
			{
				model: Host
			}
		]
	})
  .then(list => res.json(list))
  .catch(err => console.log(err))
})

module.exports = router
