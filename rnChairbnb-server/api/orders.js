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
	Order.findOne({ where: { locationId: req.params.locId } })
	.then(row => res.json(row))
	.catch(err => console.log(err))
})
router.post('/', (req, res) => {
  let item = req.body
  User.findOne({ where: { id: req.params.userId } })
  .then(user => {
    let location = Location.findOne({ where: { id: req.params.locationId } })
    return { user, location }
  })
  .then(parents => {
      const order = Order.build(item)
      order.setLocation(parents.location, { save: false })
      order.setUser(parents.user, { save: false })
      return order.save()
  })
  .then(row => res.json(row))
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
