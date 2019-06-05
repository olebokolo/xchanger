import * as React from 'react'
import { Currency } from './currency'
import _ from 'lodash'

interface ICurrencySelectProps {
  name: string;
  options: Currency[];
  value: Currency;
  onChange: (value: Currency) => any;
}

export const CurrencySelect: React.FC<ICurrencySelectProps> = (
  { name, value, options, onChange }
) => {
  return (
    <select
      id={`select-currency-${name}`}
      name={`select-${name}`}
      value={value}
      onChange={e => onChange(e.target.value as Currency)}
    >
      {
        _.union(options, [ value ]).map(currency =>
          <option
            key={currency}
            value={currency}
            // style={{ display: currency === value ? 'none' : 'initial' }}
          >
            {currency}
          </option>
        )
      }
    </select>
  )
}
