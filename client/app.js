import React from 'react'

import Routes from './routes'
import { DataDisplay } from './components/DataDisplay'

const App = () => {
  return (
    <div>
      <h1> Emptor Dashboard</h1>
      <DataDisplay classname="nav-bar" />
      <Routes />
    </div>
  )
}

export default App
