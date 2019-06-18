import _ from 'lodash';
import { combineEpics } from 'redux-observable';
import { latestRatesForBaseEpic } from './exchange/rates/rates.epics';
import * as exchangeEpics from './exchange/exchange.epics';

const appEpics = combineEpics(
  latestRatesForBaseEpic,

  ..._.values(exchangeEpics)
);

export default appEpics;
