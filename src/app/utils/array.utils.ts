export const enumToArray = <T>(e: any): T[] => {
  const values = []
  for (const v in e) {
    if (e.hasOwnProperty(v)) {
      values.push(e[ v ])
    }
  }
  return values
}
