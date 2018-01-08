const router = require('express').Router()
const Message = require('../db/models').Message
const User = require('../db/models').User
const Host = require('../db/models').Host
const Sequelize = require('sequelize')
//later probably want to refactor. messages obj's change multiple times.
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
		],
		order: ['hostId'],
	})
  .then(list => {
		//handles first case..
		let chats = [[]]
		let chatIndex = 0

		list = list.map(item => ({...item.dataValues, host: item.host, user: item.user}))
		list = list.reduce((startId, item) => {
			if(item.hostId === startId) {
				chats[chatIndex].push(item)
				return startId
			} else {
				//return/set new startId, push this item into that arr
				chatIndex++
				chats[chatIndex] = []
				chats[chatIndex].push(item)
				return item.hostId
			}
		}, list[0].hostId)
		res.json(chats)
	})
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {
	Message.create(req.body)
	.then(results => {
		console.log(results)
		res.json(results)
	})
})


module.exports = router
