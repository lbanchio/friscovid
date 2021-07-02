import IRawData from '../IRawData'
import MonthlyCases from '../summary/MonthlyCases'

export default class DailyCasesChartData {
  public static get (data: Array<IRawData>): object {
    const labels: string[] = []
    const cases: number[] = []

    const montlhyCases = MonthlyCases.get(data)

    montlhyCases.forEach((element) => {
      labels.push(element.month)
      cases.push(element.cases)
    })

    return {
      loaded: cases.length > 0,
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Casos confirmados',
            data: cases,
            backgroundColor: '#CCC'
          }
        ]
      },
      options: {
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#999'
            },
            title: {
              display: true,
              text: 'Casos detectados'
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
