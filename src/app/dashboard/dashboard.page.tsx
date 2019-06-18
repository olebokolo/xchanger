import * as _ from 'lodash';
import * as React from 'react';
import ExchangePanel from '../exchange/exchange.panel';
import { RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState } from '../app.reducer';
import { parse } from 'query-string';
import { Currency, isValidCurrency } from '../exchange/currency/currency';

interface IExchangeInitQueryParams {
  amount: number;
  from: Currency;
  to: Currency[];
}

function extractInitExchangeParams(queryParams: IExchangeInitQueryParams) {
  const rawAmount = queryParams.amount && _.toNumber(queryParams.amount);
  const rawBase = _.toUpper(queryParams.from) as Currency;

  const initAmount = _.isNumber(rawAmount) ? rawAmount : undefined;
  const initBase = isValidCurrency(rawBase) ? rawBase : undefined;
  const initCurrencies = _.castArray(queryParams.to).map(_.toUpper).filter(isValidCurrency) as Currency[];
  return {initAmount, initBase, initCurrencies};
}

export const DashboardPage: React.FC<{ queryParams: IExchangeInitQueryParams }> = ({queryParams}) => (
  <div>
    <ExchangePanel
      {...extractInitExchangeParams(queryParams)}
    />
  </div>
);

const mapStateToProps = (state: IAppState, props: RouteProps) => ({
  queryParams: parse(_.get(props, `location.search`)) as any
});

export default connect(mapStateToProps)(DashboardPage);
