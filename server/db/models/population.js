const Sequelize = require('sequelize')
const db = require('../db')

const Population = db.define('population', {
  year: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.BIGINT
  }
})
Population.beforeCreate(population =>{
    if(population.total === ""){
        population.total = 0;
    }
})
module.exports = Population
