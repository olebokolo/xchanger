import * as _ from 'lodash'
import { allCurrencies } from './currency'
import { IExchangeItem } from '../exchange.reducer'

export const getUnselectedCurrencies = (items: IExchangeItem[]) =>
  _.difference(allCurrencies, items.map((i: IExchangeItem) => i.currency))


