import { Currency } from '../currency/currency';
import {
  BaseChangedAction,
  LoadLatestRatesForBaseAction,
  LoadLatestRatesForBaseFailureAction,
  LoadLatestRatesForBaseSuccessAction
} from './rates.actions.interfaces';
import { IRatesMap } from './rates.interfaces';

export enum RatesActionType {
  BaseChanged = '[Rates] base changed',
  LoadLatestForBase = '[Rates] load latest for base',
  LoadLatestForBaseSuccess = '[Rates] load latest for base success',
  LoadLatestForBaseFailure = '[Rates] load latest for base failure',
}

export const baseChanged = (next: Currency): BaseChangedAction => ({
  type: RatesActionType.BaseChanged,
  next
});

export const loadLatestRatesForBase = (base: Currency): LoadLatestRatesForBaseAction => ({
  type: RatesActionType.LoadLatestForBase,
  base
});

export const loadLatestForBaseSuccess = (base: Currency, rates: IRatesMap): LoadLatestRatesForBaseSuccessAction => ({
  type: RatesActionType.LoadLatestForBaseSuccess,
  base, rates
});

export const loadLatestForBaseFailure = (base: Currency, error: Error): LoadLatestRatesForBaseFailureAction => ({
  type: RatesActionType.LoadLatestForBaseFailure,
  base, error
});
