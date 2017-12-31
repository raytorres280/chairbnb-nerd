const router = require('express').Router()
const Order = require('../db/models').Order
const User = require('../db/models').User
const Location = require('../db/models').Location
const Sequelize = require('sequelize')

router.get('/', (req, res) => {
  Order.findAll()
  .then(list => res.json(list))
  .catch(err => console.log(err))
})
router.get('/:id', (req, res) => {
  Order.findOne({ where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})


//fetch orders
router.get('/all/:id', (req, res) => {
	let id = req.params.id
	Order.findAndCountAll({
		where: {
			userId: id,
			is_active: true
		},
		include: [
     { model: Location, required: true}
  	]
	})
	.then(json => {
		console.log(json)
		res.json(json)
	})
	.catch(err => console.log(err))

})

//booking
router.post('/:locId', (req, res) => {
	let locId = req.params.locId
	let dates = req.body
	let start = dates[0]
	let end = dates[dates.length - 1]
	console.log(dates)
	console.log(locId)

	//if there is a row returned from this query, there are conflicting dates.
	//last case (&&) is for when a trip is within another.
	Order.findAndCountAll({
		where: {
			locationId: locId,
			is_active: true,
			$or: [
			  {
					end_date: {
						$between: [start, end]
					}
				},
				{
					start_date: {
						$between: [start, end]
					}
				},
				{
					$and: [
						{
							start_date: {
								[Sequelize.Op.lt]: start
							}
						},
						{
							end_date: {
								[Sequelize.Op.gt]: end
							}
						}
					]
				}
			]
		},
		include: [
     { model: Location, required: true}
  	]
	})
	.then(json => {
		console.log(json)
		res.json(json)
	})
	.catch(err => console.log(err))
})
router.post('/', (req, res) => {
	//**********deprecated*********************

  // let item = req.body
  // User.findOne({ where: { id: req.params.userId } })
  // .then(user => {
  //   let location = Location.findOne({ where: { id: req.params.locationId } })
  //   return { user, location }
  // })
  // .then(parents => {
  //     const order = Order.build(item)
  //     order.setLocation(parents.location, { save: false })
  //     order.setUser(parents.user, { save: false })
  //     return order.save()
  // })
  // .then(row => res.json(row))
  // .catch(err => console.log(err))
	//*****************************************

	//confirm orders
	let location = req.body.location
	console.log(req.body)
	let dates = req.body.dates
	let start = dates[0]
	let end = dates[dates.length - 1]
	// res.send('working')
	//TODO: working on route for  order book/confirm

	//if there is a row returned from this query, there are conflicting dates.
	Order.findOrCreate({
		where: {
			locationId: location.id,
			is_active: true,
			$or: [
			  {
					end_date: {
						$between: [start, end]
					}
				},
				{
					start_date: {
						$between: [start, end]
					}
				},
				{
					$and: [
						{
							start_date: {
								[Sequelize.Op.lt]: start
							}
						},
						{
							end_date: {
								[Sequelize.Op.gt]: end
							}
						}
					]
				}
			]
		},
		defaults: {
			start_date: start,
			end_date: end,
			locationId: location.id,
			days_rented: (dates.length - 1),
			coupon: '',
			total: ((dates.length - 1) * location.rate),
			userId: 1
		}
	})
	.spread((order, created) => {
		if(created) {
			console.log('created')
			return { orders: [order.get({ plain: true })], created: created }
		}
		else return { orders: order, created: created }
	})
	.then(data => {
		console.log('orders...', data.orders)
		res.send({ orders: data.orders, created: data.created })
	})
	.catch(err => console.log(err))

})
router.put('/:id', (req, res) => {
  let item = req.body
  Order.update(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  let item = req.body
  Order.delete(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})

module.exports = router
