import React from 'react'
import { cutDigitsAfterDot } from './number.utils'

describe(`cutDigitsAfterDot`, () => {

  it(`cuts 123.456789 to 5 number after dot by default`, () => {
    const value = cutDigitsAfterDot(`123.456789`)
    expect(value).toEqual(`123.45678`)
  })

  it(`cuts 123.456789 to 2 number after dot`, () => {
    const value = cutDigitsAfterDot(`123.456789`, 2)
    expect(value).toEqual(`123.45`)
  })

  it(`cuts 123.456789 to 3 number after dot`, () => {
    const value = cutDigitsAfterDot(`123.456789`, 3)
    expect(value).toEqual(`123.456`)
  })

  it(`just returns a number without a dot`, () => {
    const value = cutDigitsAfterDot(`1234`)
    expect(value).toEqual(`1234`)
  })

  it(`just returns a number without less then 5 numbers after dot`, () => {
    const value = cutDigitsAfterDot(`123.456`)
    expect(value).toEqual(`123.456`)
  })

  it(`just returns back invalid input`, () => {
    const value = cutDigitsAfterDot(`trololo`)
    expect(value).toEqual(`trololo`)
  })

  it(`just returns back null`, () => {
    const value = cutDigitsAfterDot(null as any)
    expect(value).toEqual(null)
  })

})
