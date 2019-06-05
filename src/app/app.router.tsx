import * as React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import DashboardPage from './dashboard/dashboard.page'

export const history = createBrowserHistory()

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <Route path="/" component={DashboardPage} />
    </Router>
  )
}

export default AppRouter
