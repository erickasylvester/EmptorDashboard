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
  GPD : {},
  emissions : {},
  lifeExpectancy : {},
  techExports : {},
  patentNonResidents: {},
  patentResidents : {}
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
    const res = await axios.get('/api/display_data/population')
    let newData = res.data;
    console.log("Population", res.data)

    let population = {};
    for (let i = 0; i < newData.length; i++){
      if(!population[newData[i].country.code]){
        population[newData[i].country.code] = {};
      }
      population[newData[i].country.code][newData[i].year] = newData[i].total;
    }
    dispatch(gotPopulation(population))
  } catch (err) {
    console.error(err)
  }
}

export const getGDP = () => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/gdp')
    let newData = res.data;
    console.log("GDP", res.data)
    let gdp = {};
    for (let i = 0; i < newData.length; i++){
      if(!gdp[newData[i].country.code]){
        gdp[newData[i].country.code] = {};
      }
      gdp[newData[i].country.code][newData[i].year] = newData[i].total;
    }
    dispatch(gotGDP(gdp))
  } catch (err) {
    console.error(err)
  }
}

export const getEmissions = () => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/emissions')
    let newData = res.data;
    let emissions = {};
    for (let i = 0; i < newData.length; i++){
      if(!emissions[newData[i].country.code]){
        emissions[newData[i].country.code] = {};
      }
      emissions[newData[i].country.code][newData[i].year] = newData[i].total;
    }
    dispatch(gotEmissions(emissions))
  } catch (err) {
    console.error(err)
  }
}

export const getLifeExpectancy = () => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/lifeexpectancy')
    let newData = res.data;
    let lifeExp = {};
    for (let i = 0; i < newData.length; i++){
      if(!lifeExp[newData[i].country.code]){
        lifeExp[newData[i].country.code] = {};
      }
      lifeExp[newData[i].country.code][newData[i].year] = newData[i].total;
    }
    dispatch(gotLifeExpectancy(lifeExp))
  } catch (err) {
    console.error(err)
  }
}

export const getTechExports = () => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/techexports')
    let newData = res.data;
    let techExports = {};
    for (let i = 0; i < newData.length; i++){
      if(!techExports[newData[i].country.code]){
        techExports[newData[i].country.code] = {};
      }
      techExports[newData[i].country.code][newData[i].year] = newData[i].total;
    }
    dispatch(gotTechExports(techExports))
  } catch (err) {
    console.error(err)
  }
}

export const getPatents = (resident) => async dispatch => {
  try {
    const res = await axios.get(`/api/display_data/patents/${resident}`)
    let newData = res.data;
    console.log("Patents: ", newData)
    let patents = {};
    for (let i = 0; i < newData.length; i++){
      if(!patents[newData[i].country.code]){
        patents[newData[i].country.code] = {};
      }
      patents[newData[i].country.code][newData[i].year] = newData[i].total;
    }
    dispatch(gotPatent(resident,patents))
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
    case GOT_GDP:
      return {...state, gdp: action.data}
    case GOT_EMISSIONS:
      return {...state, emissions: action.data}
    case GOT_LIFE_EXPECTANCY:
      return {...state, lifeExpectancy: action.data}
    case GOT_TECH_EXPORTS:
      return {...state, techExports: action.data}
    case GOT_PATENT:
      if(action.resident){
        return {...state, patentResidents: action.data}
      }
      else{
        return {...state, patentNonResidents: action.data} 
      }
    default:
      return state
  }
}
