import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DataTable } from './dataTable';
import {connect} from 'react-redux'
import {getPopulation} from '../store/dataStore'
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
  }
  render(){
    console.log("In render", this.props.population[this.state.selectedCountry])
    let options = [];
    let countries = Object.keys(this.props.population);
    countries.forEach(country => {
      options.push(country)
    })
    const defaultOption = options[0]
    console.log("In render - options", options)

    return (
      <div>
        <Dropdown options={options} onChange={this.onSelectCountry} value={defaultOption} placeholder="Select a country" />
        <Tabs>
          <TabList>
            <Tab>Population</Tab>
            <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
            <DataTable data={this.props.population[this.state.selectedCountry]}></DataTable>
          </TabPanel>
          <TabPanel>
            <DataTable data={this.props.population[this.state.selectedCountry]}></DataTable>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    population: state.data.population
  }
}

const mapDispatchToProps = dispatch => ({
  getPopulation: () => dispatch(getPopulation())
})

export default connect(mapStateToProps,mapDispatchToProps)(DataDisplay)
