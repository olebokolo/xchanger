import _ from 'lodash';
import { ExchangeAction } from './exchange.actions.interfaces';
import { IRatesMap } from './rates/rates.interfaces';
import { Currency } from './currency/currency';
import { RatesAction } from './rates/rates.actions.interfaces';
import { RatesActionType } from './rates/rates.actions';
import { ExchangeActionType } from './exchange.actions';

export interface IExchangeItem {
  currency: Currency;
  amount: number | undefined;
}

export interface IExchangeState {
  rates: {
    base: Currency,
    map: IRatesMap,
  },
  items: IExchangeItem[]
}

const initialState: IExchangeState = {
  rates: {
    base: Currency.GBP,
    map: {}
  },
  items: []
};

export default (state = initialState, action: ExchangeAction | RatesAction) => {

  const getCurrentBaseAmount = () => {
    const base = state.rates.base;
    return state.items.filter(i => i.currency === base).map(i => i.amount)[0];
  };

  const exchangeBaseAmountTo = (currency: Currency, baseAmount: number | null | undefined = getCurrentBaseAmount()) => {
    const rate = currency === state.rates.base ? 1 : state.rates.map[currency];
    return baseAmount && rate && baseAmount * rate;
  };

  const exchangeToBase = (currency: Currency, amount: number) => {
    const rate = state.rates.map[currency];
    return !_.isNil(rate) && !_.isNil(amount) ? amount / rate : null;
  };

  switch (action.type) {

    case RatesActionType.BaseChanged:
      return {
        ...state, rates: {
          ...state.rates, base: action.next
        }
      };

    case RatesActionType.LoadLatestForBaseSuccess:
      return {
        ...state, rates: {
          ...state.rates,
          base: action.base,
          map: action.rates
        }
      };

    case ExchangeActionType.AddCurrency:
      return {
        ...state, items: state.items.find(item => item.currency === action.currency)
          ? state.items
          : [...state.items, {currency: action.currency, amount: exchangeBaseAmountTo(action.currency)}]
      };

    case ExchangeActionType.RemoveCurrency:
      return {
        ...state, items: state.items.filter(item => item.currency !== action.currency)
      };

    case ExchangeActionType.ChangeCurrency:
      return {
        ...state, items: state.items.map(item => item.currency === action.prev
          ? {
            currency: action.next,
            amount: action.prev === state.rates.base ? item.amount : exchangeBaseAmountTo(action.next)
          }
          : item
        )
      };

    case ExchangeActionType.ChangeCurrencyAmount:
      return {
        ...state, items: state.items.map(item => {
          if (item.currency === action.currency) {
            return {...item, amount: action.amount};
          }
          return state.rates.base === action.currency
            ? {...item, amount: exchangeBaseAmountTo(item.currency, action.amount)}
            : {
              ...item,
              amount: exchangeBaseAmountTo(item.currency, exchangeToBase(action.currency, action.amount))
            };
        })
      };

    case ExchangeActionType.SyncAmountsToBase:
      return {
        ...state, items: state.items.map(item => ({
          ...item, amount: exchangeBaseAmountTo(item.currency)
        }))
      };

    default:
      return state;
  }
}
