import { combineEpics } from 'redux-observable'
import { latestRatesForBaseEpic } from './exchange/rates/rates.epics'
import {
  baseCurrencyChangedEpic,
  baseCurrencyRemovedEpic,
  syncAmountsAfterLatestRatesLoadedEpic
} from './exchange/exchange.epics'

const appEpics = combineEpics(
  /* rates */
  latestRatesForBaseEpic,

  /* exchange */
  baseCurrencyChangedEpic,
  baseCurrencyRemovedEpic,
  syncAmountsAfterLatestRatesLoadedEpic,
)

export default appEpics
