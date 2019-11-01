const Sequelize = require('sequelize')
const db = require('../db')

const Emission = db.define('emission', {
  year: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.FLOAT
  }
})

Emission.beforeCreate(emission =>{
    if(emission.total === ""){
        emission.total = 0;
    }
})
module.exports = Emission
