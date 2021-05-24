import IRawData from '../IRawData'
import { ShortMonthsEnum } from '../MonthsEnum'

export interface IMontlyDeaths {
    month: string,
    deaths: number
}

export default class LastRecord {
  public static get (raw: Array<IRawData>): Array<IMontlyDeaths> {
    const monthlySumary: {[key: string]: IMontlyDeaths} = {}

    raw.forEach((element) => {
      const key = this.getDateKey(element.date)

      if (monthlySumary[key] !== undefined) {
        monthlySumary[key].deaths = monthlySumary[key].deaths + element.deaths
      } else {
        monthlySumary[key] = { month: key, deaths: element.deaths }
      }
    })

    return Object.values(monthlySumary)
  }

  private static getDateKey (value: string): string {
    const date = new Date(value)
    return ShortMonthsEnum[date.getMonth()] + '-' + date.getFullYear()
  }
}
