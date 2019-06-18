import * as React from 'react';
import { useContext } from 'react';
import { ExchangeListItem } from './exchange.list.item';
import { IExchangeItem } from './exchange.reducer';
import { ExchangeContext } from './exchange.context';

interface IExchangeListProps {
  items: IExchangeItem[]
}

export const ExchangeList: React.FC<IExchangeListProps> = ({items}) => {
  const {changeCurrency, changeCurrencyAmount, removeCurrency} = useContext(ExchangeContext);
  return (
    <div>
      {
        items.map(({amount, currency}, index) =>
          <ExchangeListItem
            key={index}
            index={index}
            amount={amount}
            currency={currency}
            canRemove={items.length > 2}
            onAmountChange={nextAmount => changeCurrencyAmount(currency, nextAmount)}
            onCurrencyChange={nextCurrency => changeCurrency(currency, nextCurrency)}
            onRemove={() => removeCurrency(currency)}
          />
        )
      }
    </div>
  );
};
