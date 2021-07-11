export default {
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
