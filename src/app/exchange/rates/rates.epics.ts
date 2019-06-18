import axios from 'axios';
import { ActionsObservable, Epic } from 'redux-observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { filter } from 'rxjs/internal/operators/filter';
import { loadLatestForBaseFailure, loadLatestForBaseSuccess, RatesActionType } from './rates.actions';
import { LoadLatestRatesForBaseAction, RatesAction } from './rates.actions.interfaces';

const ratesApiUrl = `https://api.exchangeratesapi.io`;

export const latestRatesForBaseEpic: Epic = (action$: ActionsObservable<RatesAction>) =>
  action$.pipe(
    filter(action => action.type === RatesActionType.LoadLatestForBase),
    switchMap(async (action: LoadLatestRatesForBaseAction) => {
      try {
        const response = await axios.get(`${ratesApiUrl}/latest`, {params: {base: action.base}});
        return loadLatestForBaseSuccess(action.base, response.data.rates);
      } catch (err) {
        return loadLatestForBaseFailure(action.base, err);
      }
    })
  );
