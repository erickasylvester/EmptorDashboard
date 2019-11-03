import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DataTable } from './dataTable';
import {connect} from 'react-redux'
import {getPopulation, getGDP, getEmissions, getLifeExpectancy, getTechExports, getPatents} from '../store/dataStore'
import 'react-tabs/style/react-tabs.css';
import Dropdown from 'react-dropdown'
// import Select from 'react-select'
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
    this.props.getPopulation()
    this.props.getGDP()
    this.props.getEmissions()
    this.props.getLifeExpectancy()
    this.props.getTechExports()
    this.props.getPatentsResident(true)
    this.props.getPatentsNonResident(false)
  }

  render(){
    let options = [];
    let countries = Object.keys(this.props.population);
    countries.forEach(country => {
      options.push(country)
    })
    const defaultOption = options[0]
    console.log("In render - Pop", this.props.population);
    console.log("In order - GDP", this.props.GDP)
    return (
      <div>
        <Dropdown options={options} onChange={this.onSelectCountry} value={defaultOption} placeholder="Select a country" />
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
  getPopulation: () => dispatch(getPopulation()),
  getGDP: () => dispatch(getGDP()),
  getEmissions:() => dispatch(getEmissions()),
  getLifeExpectancy:() => dispatch(getLifeExpectancy()),
  getTechExports:() => dispatch(getTechExports()),
  getPatentsResident:(resident) => dispatch(getPatents(resident)),
  getPatentsNonResident:(resident) => dispatch(getPatents(resident)),

})

export default connect(mapStateToProps,mapDispatchToProps)(DataDisplay)
