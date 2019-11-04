import React from 'react'

import Routes from './routes'
import DataDisplay from './components/dataDisplay'
import ChangeForm from './components/changeForm'

const App = () => {
  return (
    <div>
      <h1> Emptor Dashboard</h1>
      <DataDisplay />
      <ChangeForm />
      <Routes />
    </div>
  )
}

export default App
