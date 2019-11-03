import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

/**
 * COMPONENT
 */
export const DataTable = props => {
  const {data} = props
  console.log("In data table: ", data)
  let columns = [];
  let totals = [];

  if(data){
    totals.push(data);
    let headers = Object.keys(data);
    headers.forEach((header, idx) => {
      columns.push({
        Header: header,
        accessor: header
      })
      // totals.pu=data[header];
    })
  }
  console.log("Columns: ", columns)

  console.log("Data: ", totals)
  // // console.log("Data: ", data);
  // let columns = [{
  //   Header: 'Country',
  //   accessor: 'country.name'
  // }, {
  //   Header: 'Code',
  //   accessor: 'country.code'
  // }, {
  //   Header: "year",
  //   accessor: 'year'
  // }]

  // for(let i = 1960; i < 2019; i++){
  //   columns.push({
  //     Header: "" +i,
  //     accessor: i+".total"
  //   });
  // }
  // console.log("Column", columns);

  // const data = [{
  //   name: 'Tanner Linsley',
  //   age: 26,
  //   friend: {
  //     name: 'Jason Maurer',
  //     age: 23,
  //   }
  // }]
 
  // const columns = [{
  //   Header: 'Name',
  //   accessor: 'name' // String-based value accessors!
  // }, {
  //   Header: 'Age',
  //   accessor: 'age',
  //   Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  // }, {
  //   id: 'friendName', // Required because our accessor is not a string
  //   Header: 'Friend Name',
  //   accessor: d => d.friend.name // Custom value accessors!
  // }, {
  //   Header: props => <span>Friend Age</span>, // Custom header components!
  //   accessor: 'friend.age'
  // }]


  return (

    <div>
      <ReactTable
         data={totals}
         columns={columns}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
