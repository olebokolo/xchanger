import { Action } from 'redux'
import { Currency } from './currency/currency'
import { ExchangeActionType } from './exchange.actions'

export interface SyncAmountsToBaseAction extends Action {
  readonly type: typeof ExchangeActionType.SyncAmountsToBase;
}

export interface SaveStateToQueryParamsAction extends Action {
  readonly type: typeof ExchangeActionType.SaveStateToQueryParams;
}

export interface ChangeCurrencyAmountAction extends Action {
  readonly type: typeof ExchangeActionType.ChangeCurrencyAmount;
  currency: Currency;
  amount: number;
}

export interface ChangeCurrencyAction extends Action {
  readonly type: typeof ExchangeActionType.ChangeCurrency;
  prev: Currency;
  next: Currency;
}

export interface AddCurrencyAction extends Action {
  readonly type: typeof ExchangeActionType.AddCurrency;
  currency: Currency;
}

export interface RemoveCurrencyAction extends Action {
  readonly type: typeof ExchangeActionType.RemoveCurrency;
  currency: Currency;
}

export type ExchangeAction =
  | SyncAmountsToBaseAction
  | SaveStateToQueryParamsAction
  | ChangeCurrencyAction
  | ChangeCurrencyAmountAction
  | AddCurrencyAction
  | RemoveCurrencyAction
