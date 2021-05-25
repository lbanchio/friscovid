import DateUtil from '../domain/DateUtil.ts'

describe('Date utility', () => {
  test('Can parse with valid data', () => {
    const parsedDate = DateUtil.fromString('2021-02-05')

    expect(parsedDate.getFullYear()).toBe(2021)
    expect(parsedDate.getMonth()).toBe(1) // Javascript style
    expect(parsedDate.getDate()).toBe(5)
  })
})
