import './app.scss'

import React from 'react'
import { Provider } from 'react-redux'
import store from './app.store'
import AppRouter from './app.router'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
