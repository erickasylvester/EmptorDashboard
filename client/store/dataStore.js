import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_POPULATION = 'GOT_POPULATION'
const GOT_GDP = 'GOT_GDP'
const GOT_EMISSIONS = 'GOT_EMISSIONS'
const GOT_LIFE_EXPECTANCY = 'GOT_LIFE_EXPECTANCY'
const GOT_TECH_EXPORTS = 'GOT_TECH_EXPORTS'
const GOT_PATENT = 'GOT_PATENT'


/**
 * INITIAL STATE
 */
const initialState = {
  population: {},
  GPD : [],
  emissions : [],
  lifeExpectancy : [],
  techExports : [],
  patentNonResidents: [],
  patentResidents : []
}

/**
 * ACTION CREATORS
 */
const gotPopulation = (data) => ({type: GOT_POPULATION, data})
const gotGDP = (data) => ({type: GOT_GDP, data})
const gotEmissions = (data) => ({type: GOT_EMISSIONS, data})
const gotLifeExpectancy = (data) => ({type: GOT_LIFE_EXPECTANCY, data})
const gotTechExports = (data) => ({type: GOT_TECH_EXPORTS, data})
const gotPatent = (resident, data) => ({type: GOT_PATENT, resident, data})


/**
 * THUNK CREATORS
 */
export const getPopulation = () => async dispatch => {
  try {
    console.log("Getting population")
    const res = await axios.get('/api/display_data/population')
    let newData = res.data;
    console.log("Retrived data", res.data)
    let population = {};
    for (let i = 0; i < newData.length; i++){
      if(!population[newData[i].country.code]){
        population[newData[i].country.code] = {};
      }
      population[newData[i].country.code][""+newData[i].year] = newData[i].total;
    }
    console.log("New Population Data", population)
    dispatch(gotPopulation(population))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_POPULATION:
      return {...state, population: action.data}
    default:
      return state
  }
}
