import AverageMaker from '../AverageMaker'
import IRawData from '../IRawData'
import DateUtil from '../DateUtil'

export default class DailyCasesChartData {
  public static get (data: Array<IRawData>): object {
    const labels: string[] = []
    const cases: number[] = []
    let avg: number[] = []

    data!.forEach((element: IRawData) => {
      const date = DateUtil.fromString(element.date)
      labels.push(date.toLocaleDateString())
      cases.push(element.new_cases)
    })

    avg = AverageMaker.make(7, cases, true)

    return {
      loaded: cases.length > 0,
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Media móvil 7D',
            data: avg,
            type: 'line',
            backgroundColor: '#666',
            borderColor: '#666',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3
          },
          {
            label: 'Casos confirmados',
            data: cases,
            backgroundColor: '#BBB'
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
              text: 'Casos detectados'
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
