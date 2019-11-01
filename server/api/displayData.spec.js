/* eslint-disable no-unused-expressions */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Population = db.model('population')
const GDP = db.model('gdp')
const Emission = db.model('emission')
const LifeExpectancy = db.model('lifeExpectancy')
const TechExports = db.model('techExports')
const Patent = db.model('patent')
const Country = db.model('country')

describe('Population routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/display_data/population` URI', () => {
        it('GET responds with an empty array at first', async () => {
        const res = await request(app)
            .get('/api/display_data/population')
            .expect(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.deep.equal([])
        })

        it('GET responds with populations after data has been added', async () => {
            let country = await Country.create({name: "Ecuador", code: "ECU"})
            // console.log("Country", country)
            let populationOne = await Population.create({
                year: 2019,
                total: 16000000,
                countryId : country.id
            })
            let populationTwo = await Population.create({
                year: 2018,
                total: 16000050,
                countryId : country.id
            })
            const res = await request(app)
                .get('/api/display_data/population')
                .expect(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0].year).to.deep.equal(2019) 
            expect(res.body[0].total).to.deep.equal('16000000')  
            expect(res.body[0].country.name).to.deep.equal('Ecuador')  

        })
    })
})


describe('GDP routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('GET /api/display_data/gdp` URI', () => {
          it('GET responds with an empty array at first', async () => {
          const res = await request(app)
              .get('/api/display_data/gdp')
              .expect(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.deep.equal([])
          })
  
          it('GET responds with populations after data has been added', async () => {
              let country = await Country.create({name: "Ecuador", code: "ECU"})
              // console.log("Country", country)
              let one = await GDP.create({
                  year: 2019,
                  total: 19892485160.7123,
                  countryId : country.id
              })
              let two = await GDP.create({
                  year: 2018,
                  total: 19892765245.23423,
                  countryId : country.id
              })
              const res = await request(app)
                  .get('/api/display_data/gdp')
                  .expect(200)
              expect(res.body).to.be.an('array')
              expect(res.body[0].year).to.deep.equal(2019) 
              expect(res.body[0].total).to.deep.equal('19892485160.7123')  
              expect(res.body[0].country.name).to.deep.equal('Ecuador')  
  
          })
      })
  })



  describe('Emissions routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('GET /api/display_data/emissions` URI', () => {
          it('GET responds with an empty array at first', async () => {
          const res = await request(app)
              .get('/api/display_data/emissions')
              .expect(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.deep.equal([])
          })
  
          it('GET responds with emissions after data has been added', async () => {
              let country = await Country.create({name: "Ecuador", code: "ECU"})
              // console.log("Country", country)
              let one = await Emission.create({
                  year: 2019,
                  total: 2.53844603606137,
                  countryId : country.id
              })
              let two = await Emission.create({
                  year: 2018,
                  total: 5.235346445623,
                  countryId : country.id
              })
              const res = await request(app)
                  .get('/api/display_data/emissions')
                  .expect(200)
              expect(res.body).to.be.an('array')
              expect(res.body[0].year).to.deep.equal(2019) 
              expect(res.body[0].total).to.deep.equal(2.53844603606137)  
              expect(res.body[0].country.name).to.deep.equal('Ecuador')  
  
          })
      })
  })

  describe('Life Expectancy routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('GET /api/display_data/lifeexpectancy` URI', () => {
          it('GET responds with an empty array at first', async () => {
          const res = await request(app)
              .get('/api/display_data/lifeexpectancy')
              .expect(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.deep.equal([])
          })
  
          it('GET responds with life expectancy after data has been added', async () => {
              let country = await Country.create({name: "Ecuador", code: "ECU"})
              // console.log("Country", country)
              let one = await LifeExpectancy.create({
                  year: 2019,
                  total: 70.1518292682927,
                  countryId : country.id
              })
              let two = await LifeExpectancy.create({
                  year: 2018,
                  total: 90.12325456234,
                  countryId : country.id
              })
              const res = await request(app)
                  .get('/api/display_data/lifeexpectancy')
                  .expect(200)
              expect(res.body).to.be.an('array')
              expect(res.body[0].year).to.deep.equal(2019) 
              expect(res.body[0].total).to.deep.equal(70.1518292682927)  
              expect(res.body[0].country.name).to.deep.equal('Ecuador')  
  
          })
      })
  })

  describe('Tech Exports routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('GET /api/display_data/techexports` URI', () => {
          it('GET responds with an empty array at first', async () => {
          const res = await request(app)
              .get('/api/display_data/techexports')
              .expect(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.deep.equal([])
          })
  
          it('GET responds with tech exports after data has been added', async () => {
              let country = await Country.create({name: "Ecuador", code: "ECU"})
              // console.log("Country", country)
              let one = await TechExports.create({
                  year: 2019,
                  total: 4.71762429021182,
                  countryId : country.id
              })
              let two = await TechExports.create({
                  year: 2018,
                  total: 9.12325456234,
                  countryId : country.id
              })
              const res = await request(app)
                  .get('/api/display_data/techexports')
                  .expect(200)
              expect(res.body).to.be.an('array')
              expect(res.body[0].year).to.deep.equal(2019) 
              expect(res.body[0].total).to.deep.equal(4.71762429021182)  
              expect(res.body[0].country.name).to.deep.equal('Ecuador')  
  
          })
      })
  })

  describe('Patents routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
  
    describe('GET /api/display_data/patents/:resident` URI', () => {
          it('GET responds with an empty array at first', async () => {
          const res = await request(app)
              .get('/api/display_data/patents/true')
              .expect(200)
          expect(res.body).to.be.an('array')
          expect(res.body).to.deep.equal([])
          })
  
          it('GET responds with patents for residents after data has been added', async () => {
              let country = await Country.create({name: "Ecuador", code: "ECU"})
              // console.log("Country", country)
              let one = await Patent.create({
                  year: 2019,
                  total: 36715,
                  resident: true,
                  countryId : country.id
              })
              let two = await Patent.create({
                  year: 2018,
                  total: 123,
                  resident: true,
                  countryId : country.id
              })
              const res = await request(app)
                  .get('/api/display_data/patents/true')
                  .expect(200)
              expect(res.body).to.be.an('array')
              expect(res.body[0].year).to.deep.equal(2019) 
              expect(res.body[0].total).to.deep.equal(36715)  
              expect(res.body[0].country.name).to.deep.equal('Ecuador')  
  
          })

          it('GET responds with patents for non residents after data has been added', async () => {
            let country = await Country.create({name: "Ecuador", code: "ECU"})
            // console.log("Country", country)
            let one = await Patent.create({
                year: 2019,
                total: 245346,
                resident: false,
                countryId : country.id
            })
            let two = await Patent.create({
                year: 2018,
                total: 234,
                resident: false,
                countryId : country.id
            })
            const res = await request(app)
                .get('/api/display_data/patents/false')
                .expect(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0].year).to.deep.equal(2019) 
            expect(res.body[0].total).to.deep.equal(245346)  
            expect(res.body[0].country.name).to.deep.equal('Ecuador')  

        })
        })
  })