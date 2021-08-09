export default class AverageMaker {
  public static make (elements: number, data: Array<number>, discrete: boolean = false): Array<number> {
    const ret: Array<number> = []

    for (let index = 0; index < data.length; index++) {
      let start = (index - elements)
      start = start > 0 ? start : 0

      if (start !== index) {
        const lastElements = data.slice(index > 7 ? start + 1 : start, index + 1)
        const avg = lastElements.reduce((previous: number, current: number) => {
          return previous + current
        }) / elements

        ret.push(discrete ? Math.round(avg) : avg)
      } else {
        ret.push(discrete ? Math.round(data[index]) : data[index])
      }
    }

    return ret
  }
}
