import IRawData from '../IRawData'
import MonthlyDeaths from '../summary/MonthlyDeaths'

export default class MonthlyDeathsChartData {
  public static get (data: Array<IRawData>): object {
    const labels: string[] = []
    const cases: number[] = []

    const montlhyCases = MonthlyDeaths.get(data)

    montlhyCases.forEach((element) => {
      labels.push(element.month)
      cases.push(element.deaths)
    })

    return {
      loaded: cases.length > 0,
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Fallecimientos',
            data: cases,
            backgroundColor: '#CCC'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#999'
            },
            title: {
              display: true,
              text: 'Fallecimientos'
            }
          },
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Mes'
            }
          }
        }
      }
    }
  }
}
