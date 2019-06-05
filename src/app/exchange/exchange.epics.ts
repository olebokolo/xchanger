import _ from 'lodash'
import { ActionsObservable, Epic, StateObservable } from 'redux-observable'
import { IAppState } from '../app.reducer'
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { ExchangeActionType, saveStateToQueryParams, syncAmountsToBase } from './exchange.actions'
import {
  ChangeCurrencyAction,
  ExchangeAction,
  RemoveCurrencyAction,
  SaveStateToQueryParamsAction
} from './exchange.actions.interfaces'
import { baseChanged, loadLatestRatesForBase, RatesActionType } from './rates/rates.actions'
import { RatesAction } from './rates/rates.actions.interfaces'
import { Currency } from './currency/currency'
import { history } from '../app.router'
import { EMPTY } from 'rxjs'
import { stringify } from 'query-string'

export const syncAmountsAfterLatestRatesLoadedEpic: Epic = (action$: ActionsObservable<RatesAction>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    filter(action => action.type === RatesActionType.LoadLatestForBaseSuccess),
    map(() => syncAmountsToBase())
  )

export const baseCurrencyChangedEpic: Epic = (action$: ActionsObservable<ExchangeAction>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    filter(action => action.type === ExchangeActionType.ChangeCurrency),
    withLatestFrom(state$),
    filter(([ action, state ]: [ ChangeCurrencyAction, IAppState ]) => action.prev === state.exchange.rates.base),
    switchMap(([ action ]: [ ChangeCurrencyAction, IAppState ]) => [ baseChanged(action.next), loadLatestRatesForBase(action.next) ])
  )

export const baseCurrencyRemovedEpic: Epic = (action$: ActionsObservable<ExchangeAction>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    filter(action => action.type === ExchangeActionType.RemoveCurrency),
    withLatestFrom(state$),
    filter(([ action, state ]: [ RemoveCurrencyAction, IAppState ]) => action.currency === state.exchange.rates.base),
    switchMap(([ , state ]: [ RemoveCurrencyAction, IAppState ]) => {
      const nextBase = state.exchange.items.map(item => item.currency).find(currency => currency !== state.exchange.rates.base) as Currency
      return [ baseChanged(nextBase), loadLatestRatesForBase(nextBase) ]
    })
  )

export const savingStateToQueryParamsTriggerEpic: Epic = (action$: ActionsObservable<ExchangeAction>) =>
  action$.pipe(
    filter(action => [
      ExchangeActionType.AddCurrency,
      ExchangeActionType.RemoveCurrency,
      ExchangeActionType.ChangeCurrency,
      ExchangeActionType.ChangeCurrencyAmount,
    ].includes(action.type)),
    switchMap(() => [ saveStateToQueryParams() ])
  )

export const saveExchangeStateToQueryParamsEpic: Epic = (action$: ActionsObservable<ExchangeAction>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    filter(action => action.type === ExchangeActionType.SaveStateToQueryParams),
    withLatestFrom(state$),
    switchMap(([ , state ]: [ SaveStateToQueryParamsAction, IAppState ]) => {
      const base = state.exchange.rates.base
      const baseItem = state.exchange.items.filter(item => item.currency === base).find(() => true)
      const items = state.exchange.items.filter(item => item.currency !== base)

      const from = _.toLower(base)
      const to = items.map(item => item.currency).map(_.toLower)
      const amount = baseItem && baseItem.amount

      if (!_.isNil(from) && !_.isNil(to) && !_.isNil(amount)) {
        history.push({ search: stringify({ from, to, amount }) })
      }

      return EMPTY
    })
  )

