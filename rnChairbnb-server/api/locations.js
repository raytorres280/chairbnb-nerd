const router = require('express').Router()
const Location = require('../db/models').Location
const Host = require('../db/models').Host

router.get('/', (req, res) => {
  Location.findAll()
  .then(list => res.json(list))
  .catch(err => console.log(err))
})
router.get('/:id', (req, res) => {
  Location.findOne({ where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.post('/', (req, res) => {
  let item = req.body
  Host.findOne({ where: { id: req.params.hostId } })
  .then(host => {
    console.log(host)
    const location = Location.build(item)
    // location.setHost(host, { save: false })
    return location.save()
  })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
  let item = req.body
  Location.update(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})
router.delete('/:id', (req, res) => {
  let item = req.body
  Location.delete(item, { where: { id: req.params.id } })
  .then(row => res.json(row))
  .catch(err => console.log(err))
})

module.exports = router
