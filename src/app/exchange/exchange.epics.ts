import { ActionsObservable, Epic, StateObservable } from 'redux-observable'
import { IAppState } from '../app.reducer'
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { ExchangeActionType, syncAmountsToBase } from './exchange.actions'
import { ChangeCurrencyAction, ExchangeAction, RemoveCurrencyAction } from './exchange.actions.interfaces'
import { baseChanged, loadLatestRatesForBase, RatesActionType } from './rates/rates.actions'
import { RatesAction } from './rates/rates.actions.interfaces'
import { Currency } from './currency/currency'

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
