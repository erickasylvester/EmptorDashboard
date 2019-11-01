/* eslint-disable no-unused-expressions */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Population = db.model('population')
const Country = db.model('country')

describe('Population routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/display_data` URI', () => {
        it('GET responds with an empty array at first', async () => {
        const res = await request(app)
            .get('/api/display_data')
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
                .get('/api/display_data')
                .expect(200)
            expect(res.body).to.be.an('array')
            expect(res.body[0].year).to.deep.equal(2019) 
            expect(res.body[0].total).to.deep.equal('16000000')  
            expect(res.body[0].country.name).to.deep.equal('Ecuador')  

        })
    })
})
