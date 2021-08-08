export default class AverageMaker {
  public static make (elements: number, data: Array<number>, discrete: boolean = false): Array<number> {
    const ret: Array<number> = []

    for (let index = 0; index < data.length; index++) {
      let start = (index - elements)
      start = start > 0 ? start : 0

      const lastElements = data.slice(start, index)

      const avg = lastElements.reduce((previous: number, current: number) => {
        return previous + current
      }) / elements

      ret.push(discrete ? Math.round(avg) : avg)
    }

    return ret
  }
}
