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
    })
  }

  return (

    <div>
      <ReactTable
         data={totals}
         columns={columns}
      />
    </div>
  )
}
