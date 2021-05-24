export default interface IRawData {
    date: string,
    // eslint-disable-next-line camelcase
    new_cases: number,
    deaths: number,
    hospitalized: number
    ventilators: number,
    recovered: number,
    isolated: number,
    active: number,
    // eslint-disable-next-line camelcase
    total_cases: number|undefined
 }
