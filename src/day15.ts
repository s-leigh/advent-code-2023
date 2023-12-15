

const hash = (input: string): number => {
  const ascii = input.split("").map(char => char.charCodeAt(0))
  let val = 0
  ascii.forEach(c => {
    val += c
    val = (val * 17)
    val = val % 256
  })
  return val
}

export const day15Part01 = (input: string): number => {
  return input.split(",").map(substr => hash(substr)).reduce((a, b) => a + b, 0)
}
