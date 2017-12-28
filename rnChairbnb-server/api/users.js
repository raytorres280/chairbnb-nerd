const router = require('express').Router()
const User = require('../db/models').User
router.get('/', (req, res) => {
  User.findAll()
  .then(list => res.json(list))
  .catch(err => console.log(err))
})
router.get('/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.post('/', (req, res) => {
  let item = req.body
  User.create(item)
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
  let item = req.body
  User.update(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  let item = req.body
  User.delete(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})

module.exports = router
