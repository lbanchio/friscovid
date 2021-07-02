import IRawData from '../IRawData'
import DateUtil from '../DateUtil'

export default class DailyActiveCasesChartData {
  public static get (data: Array<IRawData>): object {
    const labels: string[] = []
    const totalCases: number[] = []
    const recovered: number[] = []

    data!.forEach((element: IRawData) => {
      labels.push(DateUtil.fromString(element.date).toLocaleDateString())
      recovered.push(element.recovered)
      totalCases.push(element.total_cases ?? 0)
    })

    return {
      loaded: totalCases.length > 0,
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Casos totales',
            data: totalCases,
            backgroundColor: '#666',
            borderColor: '#666',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
            normalized: true
          },
          {
            label: 'Casos recuperados',
            data: recovered,
            backgroundColor: '#AAA',
            borderColor: '#AAA',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
            normalized: true
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
              text: 'Casos'
            }
          },
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Fecha'
            }
          }
        }
      }
    }
  }
}
