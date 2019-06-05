import { combineReducers } from 'redux'
import exchangeReducer, { IExchangeState } from './exchange/exchange.reducer'
import { routerReducer } from 'react-router-redux'

export interface IAppState {
  exchange: IExchangeState;
}

export default combineReducers({
  exchange: exchangeReducer,
  routing: routerReducer
})
