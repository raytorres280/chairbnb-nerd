const router = require('express').Router()
const Favorite = require('../db/models').Favorite
const User = require('../db/models').User
const Host = require('../db/models').Host
const Location = require('../db/models').Location
const Sequelize = require('sequelize')

router.get('/:userId', (req, res) => {
  Favorite.findAll({
		where: {
			userId: req.params.userId
		},
		include: [
			{
				model: User
			},
			{
				model: Location
			}
		]
	})
  .then(list => {
		let arr = list.map(item => item.dataValues.locationId)
		arr = arr.map(item => ({id: item}))
		return Location.findAll({
			where: {
				$or: arr
			}, include: [
				{
					model: Host
				}
			]
		})
	})
	.then(data => {
		res.json(data)
	})
  .catch(err => console.log(err))
})
router.post('/:locId', (req, res) => {
  Favorite.findOrCreate({
		where: {
			locationId: req.params.locId
		},
		include: [
			{
				model: User
			},
			{
				model: Location
			}
		],
		defaults: {
			userId: req.body.id,
			locationId: req.params.locId
		}
	})
  .then(list => res.json(list))
  .catch(err => console.log(err))
})
router.delete('/:locId/:userId', (req, res) => {
	Favorite.destroy({
		where: {
			$and: [
				{
					locationId: req.params.locId
				},
				{
					userId: req.params.userId
				}
			]
		}
	})
	.then(cnt => {
		console.log(cnt)
		res.json(cnt)
	})
})
module.exports = router
