import { shallowMount } from '@vue/test-utils'
import CustomChart from '@/components/CustomChart.vue'

describe('Custom chart', () => {
  test('Can mount component with valid data', () => {
    jest.mock('chart.js', () => {
      return jest.fn().mockImplementation(() => {
        return { }
      })
    })
    const wrapper = shallowMount(CustomChart, {
      propsData: {
        config: {
          loaded: true,
          type: 'bar',
          data: {
            labels: ['X1', 'X2'],
            datasets: [
              {
                data: [2, 4],
                type: 'line'
              }
            ]
          },
          options: {
          }
        }
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
