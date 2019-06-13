import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

it('renders without crashing', async () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
