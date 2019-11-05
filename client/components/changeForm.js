import React, {Component} from 'react'
import  {updateData} from '../store'
import {connect} from 'react-redux'

const defaultState = {
    country: 'USA',
    category: 'population',
    year: 1960,
    total: 0
}

class ChangeForm extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        console.log("On submit: ", this.state)

        const newRecord = await this.props.updateData({
            country: this.state.country,
            category: this.state.category,
            year: this.state.year,
            total: this.state.total
        })
        this.setState(defaultState)
    }
    render () {
        return (
            <form className='add-form' onSubmit={this.handleSubmit}>
                <h2> Change World Development Indicators</h2>
                <label htmlFor='country'>
                    Country:
                </label><br />
                <select name="country" onChange={this.handleChange} value={this.state.country}>
                    { this.props.countries ? (
                        this.props.countries.map((country, idx) => {
                            return <option value={country.code} key={idx}>{country.name}</option>
                        })
                    ) : (null)}
	            </select>
                <br />  
                <label htmlFor='category'>
                    Category:
                </label><br />
                <select name="category" onChange={this.handleChange} value={this.state.category} >
                    <option value="population">Population</option>
                    <option value="gdp">GDP</option>
                    <option value="emissions">Emissions</option>
                    <option value="lifeexpectancy">Life Expectancy</option>
                    <option value="techexports">Technical Exports</option>
                    <option value="patentnonresidents">Patents For Non Residents</option>
                    <option value="patentresidents">Patents For Residents</option>
                </select>
                <br />
                <label htmlFor='year'>
                    Year:
                </label><br />
                <input name="year" type="number" onChange={this.handleChange} value={this.state.year} min="0"/>
                <br />
                <label htmlFor='total'>
                    Total:
                </label><br />
                <input name="total" type="number" onChange={this.handleChange} value={this.state.total} />
                <br />
                <button type='submit' disabled={!this.state.year || !this.state.total}>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        countries : state.data.countries
    }
}
const mapDispatchToProps = (dispatch) => ({
    updateData: (updatedEntry) => dispatch(updateData(updatedEntry)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeForm)
