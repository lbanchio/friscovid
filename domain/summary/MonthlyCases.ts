import IRawData from '../IRawData'
import { ShortMonthsEnum } from '../MonthsEnum'
import DateUtil from '../DateUtil'

export interface IMontlyCase {
    month: string,
    cases: number
}

export default class LastRecord {
  public static get (raw: Array<IRawData>): Array<IMontlyCase> {
    const monthlySumary: {[key: string]: IMontlyCase} = {}

    raw.forEach((element) => {
      const key = this.getDateKey(element.date)

      if (monthlySumary[key] !== undefined) {
        monthlySumary[key].cases = monthlySumary[key].cases + element.new_cases
      } else {
        monthlySumary[key] = { month: key, cases: element.new_cases }
      }
    })

    return Object.values(monthlySumary)
  }

  private static getDateKey (value: string): string {
    const date = DateUtil.fromString(value)
    return ShortMonthsEnum[date.getMonth()] + '-' + date.getFullYear()
  }
}
