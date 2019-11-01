const Sequelize = require('sequelize')
const db = require('../db')

const LifeExpectancy = db.define('lifeExpectancy', {
  year: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.FLOAT
  }
})

LifeExpectancy.beforeCreate(expec =>{
    if(expec.total === ""){
        expec.total = 0;
    }
})
module.exports = LifeExpectancy
