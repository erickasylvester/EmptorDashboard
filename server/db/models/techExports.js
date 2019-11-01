const Sequelize = require('sequelize')
const db = require('../db')

const TechExports = db.define('techExports', {
  year: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.FLOAT
  }
})

TechExports.beforeCreate(exp =>{
    if(exp.total === ""){
        exp.total = 0;
    }
})

module.exports = TechExports
