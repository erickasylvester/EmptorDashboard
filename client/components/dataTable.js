import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactTable from 'react-table'
// import 'react-table/react-table.css'

/**
 * COMPONENT
 */
export const DataTable = props => {
  const {data, columns} = props
  return (
      
    <div>
      <ReactTable
        data={data}
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
