import * as React from 'react';
import { Currency } from './currency/currency';

export const ExchangeContext = React.createContext({} as {
  unselectedCurrencies: Currency[],
  changeCurrency: (prev: Currency, next: Currency) => any,
  changeCurrencyAmount: (currency: Currency, amount: number) => any,
  removeCurrency: (currency: Currency) => any,
});
