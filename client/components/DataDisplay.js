import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DataTable } from './dataTable';
import {connect} from 'react-redux'
import {getCountries, getPopulation, getGDP, getEmissions, getLifeExpectancy, getTechExports, getPatents} from '../store/dataStore'
import 'react-tabs/style/react-tabs.css';
import Dropdown from 'react-dropdown'
import Select from 'react-virtualized-select'


/**
 * COMPONENT
 */
class DataDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedCountry : "USA"
    }
    this.onSelectCountry = this.onSelectCountry.bind(this)
  }
  onSelectCountry(e){
    this.setState({selectedCountry: e.value})
  }
  componentDidMount() {
    this.props.getCountries()
    this.props.getPopulation()
    this.props.getGDP()
    this.props.getEmissions()
    this.props.getLifeExpectancy()
    this.props.getTechExports()
    this.props.getPatentsResident(true)
    this.props.getPatentsNonResident(false)
  }

  render(){
    console.log("In Render, countries", this.props.countries)
    return (
      <div>
        <select name="country" onChange={this.handleChange} value={this.state.country}>
            { this.props.countries ? (
                this.props.countries.map((country, idx) => {
                    return <option value={country.code} key={idx}>{country.name} </option>
                })
            ) : (null)}
        </select>
        <Tabs>
          <TabList>
            <Tab>Population</Tab>
            <Tab>GDP</Tab>
            <Tab>Emissions</Tab>
            <Tab>Life Expectancy</Tab>
            <Tab>Technical Exports</Tab>
            <Tab>Patents for Residents</Tab>
            <Tab>Patents for Non Residents</Tab>
          </TabList>

          <TabPanel>
            {this.props.population ? ( 
              <DataTable data={this.props.population[this.state.selectedCountry]}></DataTable>
            ) : (null)}
          </TabPanel>
          <TabPanel>
            {this.props.GDP ? ( 
            <DataTable data={this.props.GDP[this.state.selectedCountry]}></DataTable>
            ) : (null)}
          </TabPanel>
          <TabPanel>
            <DataTable data={this.props.emissions[this.state.selectedCountry]}></DataTable>
          </TabPanel>
          <TabPanel>
            <DataTable data={this.props.lifeExpectancy[this.state.selectedCountry]}></DataTable>
          </TabPanel>
          <TabPanel>
            <DataTable data={this.props.techExports[this.state.selectedCountry]}></DataTable>
          </TabPanel>
          <TabPanel>
            <DataTable data={this.props.patentResidents[this.state.selectedCountry]}></DataTable>
          </TabPanel>
          <TabPanel>
            <DataTable data={this.props.patentNonResidents[this.state.selectedCountry]}></DataTable>
          </TabPanel>
        </Tabs>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    countries : state.data.countries,
    population: state.data.population,
    GDP: state.data.gdp,
    emissions: state.data.emissions,
    lifeExpectancy : state.data.lifeExpectancy,
    techExports: state.data.techExports,
    patentNonResidents: state.data.patentNonResidents,
    patentResidents: state.data.patentResidents

  }
}

const mapDispatchToProps = dispatch => ({
  getCountries: () => dispatch(getCountries()),
  getPopulation: () => dispatch(getPopulation()),
  getGDP: () => dispatch(getGDP()),
  getEmissions:() => dispatch(getEmissions()),
  getLifeExpectancy:() => dispatch(getLifeExpectancy()),
  getTechExports:() => dispatch(getTechExports()),
  getPatentsResident:(resident) => dispatch(getPatents(resident)),
  getPatentsNonResident:(resident) => dispatch(getPatents(resident)),

})

export default connect(mapStateToProps,mapDispatchToProps)(DataDisplay)
