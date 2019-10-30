const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    //retrieve data
    console.log("Data retrieval placeholder")
})
