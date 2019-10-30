const Population = require('./population')
const Country = require('./country')


Population.belongsTo(Country);


module.exports = {
  Population,
  Country
}
