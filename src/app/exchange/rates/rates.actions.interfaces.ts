import { IRatesMap } from './rates.interfaces';
import { RatesActionType } from './rates.actions';
import { Currency } from '../currency/currency';
import { Action } from 'redux';

export interface BaseChangedAction extends Action {
  readonly type: typeof RatesActionType.BaseChanged;
  next: Currency;
}

export interface LoadLatestRatesForBaseAction extends Action {
  readonly type: typeof RatesActionType.LoadLatestForBase;
  base: Currency;
}

export interface LoadLatestRatesForBaseSuccessAction extends Action {
  readonly type: typeof RatesActionType.LoadLatestForBaseSuccess;
  base: Currency;
  rates: IRatesMap;
}

export interface LoadLatestRatesForBaseFailureAction extends Action {
  readonly type: typeof RatesActionType.LoadLatestForBaseFailure;
  base: Currency;
  error: Error;
}

export type RatesAction =
  | BaseChangedAction
  | LoadLatestRatesForBaseAction
  | LoadLatestRatesForBaseSuccessAction
  | LoadLatestRatesForBaseFailureAction

