const router = require('express').Router()
const Host = require('../db/models').Host
router.get('/', (req, res) => {
  Host.findAll()
  .then(list => res.json(list))
  .catch(err => console.log(err))
})
router.get('/:id', (req, res) => {
  Host.findOne({ where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.post('/', (req, res) => {
  let item = req.body
  Host.create(item)
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
  let item = req.body
  Host.update(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  let item = req.body
  Host.delete(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})

module.exports = router
