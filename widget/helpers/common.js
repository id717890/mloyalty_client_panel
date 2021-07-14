import { parseISO, format } from 'date-fns'
export default {
  getDateFormat(value, formatStr = 'dd.MM.yyyy') {
    const date = parseISO(value)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getYear()
    return format(new Date(year, month, day, 0, 0, 0), formatStr)
  },
  getClearPhone(phone, woFirstSym = false) {
    if (!phone) return phone
    const buf = phone
      ?.toString()
      ?.replaceAll(' ', '')
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('-', '')
      .replaceAll('+', '')
    if (!woFirstSym) {
      return buf
    } else {
      return buf.substring(1, buf.length)
    }
  },
}
