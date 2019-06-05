import * as React from 'react'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { cutDigitsAfterDot, isNumberWithLessThanXDigitsAfterDot } from '../../utils/number.utils'

interface ICurrencyInputProps {
  name: string;
  value?: number;
  onChange?: (value: number | null) => any;
}

export const CurrencyInput: React.FC<ICurrencyInputProps> = ({ name, value, onChange }) => {
  const [ amount, setAmount ] = useState(``)

  useEffect(() => {
    if (_.isNil(value)) {
      setAmount(``)
    } else {
      setAmount(cutDigitsAfterDot(value + ``, 5))
    }
  }, [ value ])

  const isEmptyOrNumberWithLessThan5DigitsAfterDot = (value: string): boolean => {
    return !value || isNumberWithLessThanXDigitsAfterDot(value, 5)
  }

  const onAmountChange = (value: string) => {
    const _value = cutDigitsAfterDot(value, 5)
    if (isEmptyOrNumberWithLessThan5DigitsAfterDot(_value)) {
      setAmount(_value)
      onChange && onChange(_.isEmpty(_value) ? null : _.toNumber(_value))
    }
  }

  return (
    <input id={`input-currency-${name}`}
           name={`input-${name}`}
           value={amount}
           onChange={e => onAmountChange(e.target.value)}
    />
  )
}
