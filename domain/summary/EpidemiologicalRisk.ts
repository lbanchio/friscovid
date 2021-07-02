import IRawData from '../IRawData'

export default class EpidemiologicalRisk {
  private growingFactor: number = 1.136473534;
  private currentPopulation: number = 62211;
  private standardPopulation: number = 100000;

  private rawData: Array<IRawData> = [];

  constructor (raw: Array<IRawData>) {
    this.rawData = raw
  }

  private getEstimatedPopulation (): number {
    return this.growingFactor * this.currentPopulation
  }

  public getCasesIncidence (): number {
    const lastCasesGroup = this.rawData.slice(this.rawData.length - 14, this.rawData.length)
    const lastCasesCount: number = lastCasesGroup.reduce((accumulated: number = 0, current: IRawData) => {
      return accumulated + current.new_cases
    }, 0)

    return (lastCasesCount / this.getEstimatedPopulation()) * this.standardPopulation
  }

  public getCasesRatio (): number {
    const currentCasesGroup = this.rawData.slice(this.rawData.length - 14, this.rawData.length)
    const currentCasesCount: number = currentCasesGroup.reduce((accumulated: number = 0, current: IRawData) => {
      return accumulated + current.new_cases
    }, 0)

    const previousCasesGroup = this.rawData.slice(this.rawData.length - 28, this.rawData.length - 14)
    const previousCasesCount: number = previousCasesGroup.reduce((accumulated: number = 0, current: IRawData) => {
      return accumulated + current.new_cases
    }, 0)

    return currentCasesCount / previousCasesCount
  }

  public getIncidenceAngle (): number {
    const composedIncidence: number = this.getCasesIncidence() * this.getCasesRatio()

    if (composedIncidence >= 300) {
      return 180
    }

    if (composedIncidence >= 250 && composedIncidence < 300) {
      const calcIncidence = composedIncidence - 250
      return (calcIncidence * 45 / 50) + 135
    }

    if (composedIncidence >= 150 && composedIncidence < 250) {
      const calcIncidence = composedIncidence - 150
      return (calcIncidence * 45 / 100) + 90
    }

    if (composedIncidence >= 50 && composedIncidence < 150) {
      const calcIncidence = composedIncidence - 50
      return (calcIncidence * 45 / 100) + 45
    }

    if (composedIncidence >= 0 && composedIncidence < 50) {
      const calcIncidence = composedIncidence
      return (calcIncidence * 45 / 50)
    }

    return 180
  }
}
