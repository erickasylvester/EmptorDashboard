const Sequelize = require('sequelize')
const db = require('../db')

const GDP = db.define('gdp', {
  year: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.DECIMAL
  }
})
GDP.beforeCreate(gpd =>{
    if(gpd.total === ""){
        gpd.total = 0;
    }
})
module.exports = GDP
