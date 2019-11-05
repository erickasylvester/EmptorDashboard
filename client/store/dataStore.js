import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_POPULATION = 'GOT_POPULATION'
const GOT_GDP = 'GOT_GDP'
const GOT_EMISSIONS = 'GOT_EMISSIONS'
const GOT_LIFE_EXPECTANCY = 'GOT_LIFE_EXPECTANCY'
const GOT_TECH_EXPORTS = 'GOT_TECH_EXPORTS'
const GOT_PATENT = 'GOT_PATENT'
const UPDATE_DATA = "UPDATE_DATA"
const UPDATE_COUNTRIES = "UPDATE_COUNTRIES"

/**
 * INITIAL STATE
 */
const initialState = {
  population: {},
  gdp : {},
  emissions : {},
  lifeExpectancy : {},
  techExports : {},
  patentNonResidents: {},
  patentResidents : {},
  countries: []
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
const updateCountries = (countries) => ({type: UPDATE_COUNTRIES, countries})

const POPULATION = "population"
/**
 * THUNK CREATORS
 */


export const getCountries = (data) => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/countries')
    dispatch(updateCountries(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateData = (data) => async dispatch => {
  try {
    switch(data.category){
      case POPULATION:
        {
          const res = await axios.put('/api/display_data/population', data)
          let population = restructureData(res.data)
          dispatch(gotPopulation(population))        
        }
        default:
          {
          }
    }

  } catch (err) {
    console.error(err)
  }
}
const restructureData =(inputData) => {
  let output = {};
  for (let i = 0; i < inputData.length; i++){
    if(!output[inputData[i].country.code]){
      output[inputData[i].country.code] = {};
    }
    output[inputData[i].country.code][inputData[i].year] = inputData[i].total;
  }
  return output
}
export const getPopulation = () => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/population')
    let population = restructureData(res.data)
    dispatch(gotPopulation(population))
  } catch (err) {
    console.error(err)
  }
}

export const getGDP = () => async dispatch => {
  try {
    const res = await axios.get('/api/display_data/gdp')
    let newData = res.data;
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
    case UPDATE_DATA:
      if(action.data.category === "population"){
        return {...state, population: action.data.population}
      }
      else if(action.data.category === "gpd"){
        return {...state, gdp: action.data.gdp}
      }
      else if(action.data.category === "emissions"){
        return {...state, emissions: action.data.emissions}
      }
      else if(action.data.category === "lifeExpectancy"){
        return {...state, lifeExpectancy: action.data.lifeExpectancy}
      }
      else if(action.data.category === "techExports"){
        return {...state, techExports: action.data.techExports}
      }
      else if(action.data.category === "patentResidents"){
        return {...state, patentResidents: action.data.patentResidents}
      }
      else if(action.data.category === "patentNonResidents"){
        return {...state, patentNonResidents: action.data.patentNonResidents}
      }
    case UPDATE_COUNTRIES:
      return {...state, countries: action.countries}
    default:
      return state
  }
}
