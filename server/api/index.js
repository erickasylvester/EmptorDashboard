const router = require('express').Router()

router.use('/display_data', require('./displayData'))

router.use((req, res, next) => {
  const error = new Error('Route Not Found')
  error.status = 404
  next(error)
})

module.exports = router
