import * as React from 'react'
import { useEffect } from 'react'
import { ExchangeContext } from './exchange.context'
import { connect } from 'react-redux'
import { loadLatestRatesForBase } from './rates/rates.actions'
import { Dispatch } from 'redux'
import { IAppState } from '../app.reducer'
import { Currency } from './currency/currency'
import { getUnselectedCurrencies } from './currency/currency.selectors'
import { ExchangeList } from './exchange.list'
import * as _ from 'lodash'
import { addCurrency, changeCurrency, changeCurrencyAmount, removeCurrency } from './exchange.actions'
import { IExchangeItem } from './exchange.reducer'

interface IExchangePanelProps {

  initBase?: Currency;
  initAmount?: number;
  initCurrencies?: Currency[];

  items: IExchangeItem[];
  unselectedCurrencies: Currency[];

  loadLatestRatesForBase: (base: Currency) => any;
  addCurrency: (currency: Currency) => any;
  removeCurrency: (currency: Currency) => any;
  changeCurrency: (prev: Currency, next: Currency) => any,
  changeCurrencyAmount: (currency: Currency, amount: number) => any,
}

export const ExchangePanel: React.FC<IExchangePanelProps> = (
  {
    initBase, initAmount, initCurrencies,

    items, unselectedCurrencies,
    loadLatestRatesForBase,

    addCurrency, removeCurrency, changeCurrency, changeCurrencyAmount
  }
) => {

  useEffect(() => {
    const base = initBase || Currency.GBP
    const amount = initAmount || 100

    loadLatestRatesForBase(base)

    if (_.isEmpty(initCurrencies)) {
      addCurrency(base)
      addCurrency(base === Currency.GBP ? Currency.PLN : Currency.GBP)
    }

    changeCurrencyAmount(base, amount)

  }, [])

  const addAnotherCurrency = () => {
    if (!_.isEmpty(unselectedCurrencies)) {
      return addCurrency(_.head(unselectedCurrencies) as Currency)
    }
  }

  return (
    <ExchangeContext.Provider value={{ unselectedCurrencies, changeCurrency, changeCurrencyAmount, removeCurrency }}>
      <ExchangeList items={items} />
      <hr />
      <div>
        <button onClick={addAnotherCurrency}>+</button>
      </div>
    </ExchangeContext.Provider>
  )
}

const mapStateToProps = (state: IAppState) => ({
  items: state.exchange.items,
  unselectedCurrencies: getUnselectedCurrencies(state.exchange.items)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadLatestRatesForBase: (base: Currency) => dispatch(loadLatestRatesForBase(base)),
  addCurrency: (currency: Currency) => dispatch(addCurrency(currency)),
  removeCurrency: (currency: Currency) => dispatch(removeCurrency(currency)),
  changeCurrency: (prev: Currency, next: Currency) => dispatch(changeCurrency(prev, next)),
  changeCurrencyAmount: (currency: Currency, amount: number) => dispatch(changeCurrencyAmount(currency, amount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePanel)
