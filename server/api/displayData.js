const router = require('express').Router()
const {Population, Country} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const populations = await Population.findAll({
            include: [{model: Country}]
        })
        res.json(populations);

      } catch (error) {
        next(error)
      }
})
