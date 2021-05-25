export default class DateUtil {
  public static fromString (value: string): Date {
    return new Date(
      Number.parseInt(value.substring(0, 4)),
      Number.parseInt(value.substring(5, 7)) - 1,
      Number.parseInt(value.substring(8, 10)),
      12,
      0,
      0
    )
  }
}
