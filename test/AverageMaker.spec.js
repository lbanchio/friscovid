import AverageMaker from '../domain/AverageMaker'

describe('AverageMaker tests', () => {
  test('Average calculation is correct', () => {
    const avg = AverageMaker.make(7, [10, 10, 10, 10, 10, 10, 10], false)
    expect(avg.pop()).toBe(10)
  })

  test('Average calculation is correct with more items', () => {
    const avg = AverageMaker.make(7, [10, 10, 10, 10, 10, 10, 10, 10, 10], false)
    expect(avg.pop()).toBe(10)
  })
})
