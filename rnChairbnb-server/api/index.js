'use strict'
const apiRouter = require('express').Router()
const db = require('../db')

apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))
apiRouter.use('/users', require('./users'))
apiRouter.use('/hosts', require('./hosts'))
apiRouter.use('/locations', require('./locations'))
apiRouter.use('/orders', require('./orders'))
apiRouter.use('/messages', require('./messages'))
// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;
