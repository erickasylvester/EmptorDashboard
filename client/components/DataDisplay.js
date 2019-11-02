import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DataTable } from './dataTable';
// import 'react-tabs/style/react-tabs.css';
/**
 * COMPONENT
 */
export const DataDisplay = props => {

  const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  }]
 
  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }]

  return (
      <div>
    <Tabs>
      <TabList>
        <Tab>Title 1</Tab>
        <Tab>Title 2</Tab>
      </TabList>

      <TabPanel>
        <DataTable data={data} columns={columns}></DataTable>
      </TabPanel>
      <TabPanel>
        <DataTable data={data} columns={columns}></DataTable>
      </TabPanel>
    </Tabs>
    </div>
  )
}