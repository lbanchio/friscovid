import IRawData from '../IRawData'
import DateUtil from '../DateUtil'

export default class DailyHospitalizedChartData {
  public static get (data: Array<IRawData>): Object {
    const labels: string[] = []
    const hospitalized: number[] = []
    const ventilated: number[] = []

    data!.forEach((element: IRawData) => {
      const date = DateUtil.fromString(element.date)
      labels.push(date.toLocaleDateString())
      hospitalized.push(element.hospitalized)
      ventilated.push(element.ventilators)
    })

    return {
      loaded: hospitalized.length > 0,
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Uso de ARM',
            data: ventilated,
            backgroundColor: '#666'
          },
          {
            label: 'Hospitalizados',
            data: hospitalized,
            backgroundColor: '#BBB'
          }

        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
            stepSize: 1,
            title: {
              display: true,
              text: 'Pacientes'
            }
          },
          x: {
            stacked: true,
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
