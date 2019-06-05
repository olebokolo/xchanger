import * as _ from 'lodash'
import { CurrencySelect } from './currency/currency.select'
import * as React from 'react'
import { useContext } from 'react'
import { Currency } from './currency/currency'
import { CurrencyInput } from './currency/currency.input'
import { ExchangeContext } from './exchange.context'

interface IExchangeListItemProps {
  index: number
  amount?: number;
  currency: Currency;
  canRemove: boolean;

  onAmountChange: (amount: number) => any,
  onCurrencyChange: (currency: Currency) => any,
  onRemove: () => any,
}

export const ExchangeListItem: React.FC<IExchangeListItemProps> = (
  {
    amount, currency, index, canRemove = true,
    onAmountChange, onCurrencyChange, onRemove
  }
) => {
  const { unselectedCurrencies } = useContext(ExchangeContext)
  return (
    <div key={`currency-row-${index}`}>
      <CurrencyInput
        name={`currency-amount-${_.lowerCase(currency)}`}
        value={amount}
        onChange={onAmountChange}
      />
      <CurrencySelect
        name={`currency-select-${_.lowerCase(currency)}`}
        value={currency}
        options={unselectedCurrencies}
        onChange={onCurrencyChange}
      />
      <button disabled={!canRemove} onClick={onRemove}>x</button>
    </div>
  )
}
