import * as _ from 'lodash'
import * as React from 'react'
import ExchangePanel from '../exchange/exchange.panel'
import { RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { IAppState } from '../app.reducer'
import { parse } from 'query-string'
import { Currency } from '../exchange/currency/currency'

export const DashboardPage: React.FC<any> = ({ queryParams }) => {
  const initBase = _.toUpper(queryParams.from) as Currency

  return (
    <div>
      <ExchangePanel initBase={initBase} />
    </div>
  )
}

const mapStateToProps = (state: IAppState, props: RouteProps) => ({
  queryParams: parse(_.get(props, `location.search`))
})

export default connect(mapStateToProps)(DashboardPage)
