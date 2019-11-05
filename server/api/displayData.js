const router = require('express').Router()
const {Population, Country, GDP, Emission, LifeExpectancy, TechExports, Patent} = require('../db/models')
module.exports = router

router.put('/population', async (req, res, next) => {
  console.log("Updating Data!", req.body)
  try {
    let countryData = await Country.findAll({where:{ code: req.body.country}})
    let country = countryData[0]
    console.log("Country ID", country.id)

    let newRecord = await Population.update({
      total: req.body.total
      }, {
      where: {countryId: country.id,
              year: req.body.year},
      returning : true,
      // plain: true
    })
    console.log("New Record", newRecord)

    const populations = await Population.findAll({
      include: [{model: Country}]
    })
    res.json(populations);
  
    // else if(req.body.category === "gdp"){
    //   await GDP.update({
    //     total: req.body.total
    //   }, {
    //     where: {countryId: country.id,
    //             year: req.body.year},
    //     returning : true,
    //     plain: true
    //    })
    // }
    // else if(req.body.category === "emissions"){
    //   await Emission.update({
    //     total: req.body.total
    //   }, {
    //     where: {countryId: country.id,
    //             year: req.body.year},
    //     returning : true,
    //     plain: true
    //    })
    // }
    // else if(req.body.category === "lifeexpectancy"){
    //   await LifeExpectancy.update({
    //     total: req.body.total
    //   }, {
    //     where: {countryId: country.id,
    //             year: req.body.year},
    //     returning : true,
    //     plain: true
    //    })
    // }
    // else if(req.body.category === "techexports"){
    //   await TechExports.update({
    //     total: req.body.total
    //   }, {
    //     where: {countryId: country.id,
    //             year: req.body.year},
    //     returning : true,
    //     plain: true
    //    })
    // }
    // else if(req.body.category === "patentnonresidents"){
    //   await Patent.update({
    //     total: req.body.total,
    //     resident: false
    //   }, {
    //     where: {countryId: country.id,
    //             year: req.body.year},
    //     returning : true,
    //     plain: true
    //    })
    // }
    // else if(req.body.category === "patentresidents"){
    //   await Patent.update({
    //     total: req.body.total,
    //     resident: true
    //   }, {
    //     where: {countryId: country.id,
    //             year: req.body.year},
    //     returning : true,
    //     plain: true
    //    })
    // }
  } catch (error) {
    next(error)
  }
})
router.get('/population', async (req, res, next) => {
    try {
        const populations = await Population.findAll({
            include: [{model: Country}]
        })
        res.json(populations);

      } catch (error) {
        next(error)
      }
})

router.get('/gdp', async (req, res, next) => {
  try {
      const gdp = await GDP.findAll({
          include: [{model: Country}]
      })
      res.json(gdp);

    } catch (error) {
      next(error)
    }
})

router.get('/emissions', async (req, res, next) => {
  try {
      const emissions = await Emission.findAll({
          include: [{model: Country}]
      })
      res.json(emissions);

    } catch (error) {
      next(error)
    }
})

router.get('/lifeexpectancy', async (req, res, next) => {
  try {
      const lifeExpectancies = await LifeExpectancy.findAll({
          include: [{model: Country}]
      })
      res.json(lifeExpectancies);

    } catch (error) {
      next(error)
    }
})

router.get('/techexports', async (req, res, next) => {
  try {
      const techExports = await TechExports.findAll({
          include: [{model: Country}]
      })
      res.json(techExports);

    } catch (error) {
      next(error)
    }
})

router.get('/patents/:resident', async (req, res, next) => {
  try {
      const patents = await Patent.findAll({
        where: {
          resident: req.params.resident
        },
        include: [{model: Country}]
      })
      res.json(patents);

    } catch (error) {
      next(error)
    }
})

router.get('/countries', async (req, res, next) => {
  console.log("In server, getting countries")
  try {
      const countries = await Country.findAll()
      console.log("In server, got countries", countries)

      res.json(countries);

    } catch (error) {
      next(error)
    }
})