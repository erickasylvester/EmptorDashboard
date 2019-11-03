import React from 'react'

import Routes from './routes'
import DataDisplay from './components/dataDisplay'

const App = () => {
  return (
    <div>
      <h1> Emptor Dashboard</h1>
      <DataDisplay />
      <Routes />
    </div>
  )
}

export default App
