const Population = require('./population')
const Country = require('./country')
const GDP = require('./gdp')
const Emission = require('./emission')
const LifeExpectancy = require('./lifeExpectancy')
const TechExports = require('./techExports')
const Patent = require('./patent')


Population.belongsTo(Country);
GDP.belongsTo(Country);
Emission.belongsTo(Country);
LifeExpectancy.belongsTo(Country);
TechExports.belongsTo(Country);
Patent.belongsTo(Country);


module.exports = {
  Population,
  Country,
  GDP,
  Emission,
  LifeExpectancy,
  TechExports,
  Patent
}
