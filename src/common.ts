declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    sum(): number
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterNotEmpty(): Array<T>
    min(): number
    max(): number
    product(): number
    last(): T
  }
}

Array.prototype.sum = function () { return this.reduce((a, b) => a + b) }
Array.prototype.filterNotEmpty = function () { return this.filter(s => s !== "") }
Array.prototype.min = function () { return this.reduce((a, b) => b < a ? b : a) }
Array.prototype.max = function () { return this.reduce((a, b) => b < a ? a : b) }
Array.prototype.product = function () { return this.reduce((a, b) => a * b) }
Array.prototype.last = function () { return this[this.length - 1] }

export const splitInputIntoLines = (input: string) => input.split("\n")
export const splitInputIntoLinesWindowsStyle = (input: string) => input.split("\r\n")

export const arrayOfIndices = (length: number) => Array(length).fill(0).map((_, i) => i)

export const parseVertically = (map: string[]): string[][] => {
  const vertical: string[][] = []
  for (let x = 0; x < map[0].length; x++) {
    map.forEach((line) => {
      vertical[x] ? vertical[x].push(line[x]) : vertical[x] = [line[x]]
    })
  }
  return vertical
}
