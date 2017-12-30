const router = require('express').Router()
const Order = require('../db/models').Order
const User = require('../db/models').User
const Location = require('../db/models').Location

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
//booking
router.post('/:locId', (req, res) => {
	let locId = req.params.locId
	let dates = req.body
	let start = dates[0]
	let end = dates[dates.length - 1]
	console.log(dates)

	//if there is a row returned from this query, there are conflicting dates.
	Order.findAndCountAll({
		where: {
			locationId: req.params.locId,
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
				}
			]
		}
	})
	.then(rows => rows === null ? res.json(rows) : rows)
	.then(orders => {
		console.log(orders)
		res.json(orders.rows)
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

	//confirm orderslet locId = req.params.locId
	let dates = req.body.location
	let start = dates[0]
	let end = dates[dates.length - 1]
	console.log(req.body)
	res.send('working')
	//TODO: working on route for  order book/confirm
	
	//if there is a row returned from this query, there are conflicting dates.
	// Order.findOrCreate({
	// 	where: {
	// 		locationId: req.params.locId,
	// 		is_active: true,
	// 		$or: [
	// 		  {
	// 				end_date: {
	// 					$between: [start, end]
	// 				}
	// 			},
	// 			{
	// 				start_date: {
	// 					$between: [start, end]
	// 				}
	// 			}
	// 		]
	// 	}
	// })
	// .then(rows => rows === null ? res.json(rows) : rows)
	// .then(orders => {
	// 	console.log(orders)
	// 	res.json(orders.rows)
	// })
	// .catch(err => console.log(err))

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
