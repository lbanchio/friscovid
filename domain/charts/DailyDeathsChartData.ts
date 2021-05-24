import IRawData from '../IRawData'

export default class DailyCasesChartData {
  public static get (data: Array<IRawData>): Object {
    const labels: string[] = []
    const deaths: number[] = []

    data!.forEach((element: IRawData) => {
      const date = new Date(element.date)
      labels.push(date.toLocaleDateString())
      deaths.push(element.deaths)
    })

    return {
      loaded: deaths.length > 0,
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Fallecidos',
            data: deaths,
            backgroundColor: '#BBB'
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            precision: 0,
            stepSize: 1,
            title: {
              display: true,
              text: 'Fallecidos'
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
