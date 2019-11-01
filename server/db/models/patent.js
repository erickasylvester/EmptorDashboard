const Sequelize = require('sequelize')
const db = require('../db')

const Patent = db.define('patent', {
  year: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER
  },
  resident:{
      type: Sequelize.BOOLEAN
  }
})

Patent.beforeCreate(patent =>{
    if(patent.total === ""){
        patent.total = 0;
    }
})
module.exports = Patent
