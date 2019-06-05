import * as _ from 'lodash'

export const cutDigitsAfterDot = (value: string, maxDigits = 5): string => {
  const firstDigitsAfterComma = new RegExp(`^(\\d+(\\.\\d{${maxDigits}})?)(\\d*)$`)
  const matches = (value || ``).match(firstDigitsAfterComma)
  const match = _.get(matches, 1)
  return (match && +match + ``) || value
}

export const isNumberWithLessThanXDigitsAfterDot = (value: string, digits: number): boolean => {
  const regex = new RegExp(`^\\d+(\\.\\d{0,${digits}})?$`)
  return !!(value || ``).match(regex)
}
