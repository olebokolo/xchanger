import {
  AddCurrencyAction,
  ChangeCurrencyAction,
  ChangeCurrencyAmountAction,
  RemoveCurrencyAction,
  SaveStateToQueryParamsAction,
  SyncAmountsToBaseAction
} from './exchange.actions.interfaces'
import { Currency } from './currency/currency'

export enum ExchangeActionType {
  SyncAmountsToBase = '[Exchange] sync amounts to base',

  AddCurrency = '[Exchange] add currency',
  RemoveCurrency = '[Exchange] remove currency',
  ChangeCurrency = '[Exchange] change currency',
  ChangeCurrencyAmount = '[Exchange] change currency amount',

  SaveStateToQueryParams = '[Exchange] save state to query params'
}

export const syncAmountsToBase = (): SyncAmountsToBaseAction => ({
  type: ExchangeActionType.SyncAmountsToBase
})

export const addCurrency = (currency: Currency): AddCurrencyAction => ({
  type: ExchangeActionType.AddCurrency,
  currency
})

export const removeCurrency = (currency: Currency): RemoveCurrencyAction => ({
  type: ExchangeActionType.RemoveCurrency,
  currency
})

export const changeCurrency = (prev: Currency, next: Currency): ChangeCurrencyAction => ({
  type: ExchangeActionType.ChangeCurrency,
  prev, next
})

export const changeCurrencyAmount = (currency: Currency, amount: number): ChangeCurrencyAmountAction => ({
  type: ExchangeActionType.ChangeCurrencyAmount,
  currency, amount,
})

export const saveStateToQueryParams = (): SaveStateToQueryParamsAction => ({
  type: ExchangeActionType.SaveStateToQueryParams,
})
