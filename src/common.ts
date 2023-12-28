declare global {
  interface Array<T> {
    filterNotEmpty(): Array<T>
    last(): T
    max(): number
    min(): number
    product(): number
    removeDuplicates(): Array<T>
    sum(): number
  }
}

Array.prototype.filterNotEmpty = function () { return this.filter(s => s !== "") }
Array.prototype.last = function () { return this[this.length - 1] }
Array.prototype.max = function () { return this.reduce((a, b) => b < a ? a : b) }
Array.prototype.min = function () { return this.reduce((a, b) => b < a ? b : a) }
Array.prototype.product = function () { return this.reduce((a, b) => a * b, 1) }
Array.prototype.removeDuplicates = function () { return this.reduce((acc, curr) => !acc.includes(curr) ? acc.concat([curr]) : acc, [])}
Array.prototype.sum = function () { return this.reduce((a, b) => a + b) }

export type CardinalDirection = "N" | "W" | "S" | "E"
export type RelativeDirection = "U" | "L" | "D" | "R"

export const splitInputIntoLines = (input: string) => input.split("\n")
export const splitInputIntoLinesWindowsStyle = (input: string) => input.split("\r\n")

export const arrayOfIndices = (length: number) => Array(length).fill(0).map((_, i) => i)

// Reflection axis is top left to bottom right
// so line y=0 becomes x=0
export const reflectMatrixDiagonally = (matrix: string[]): string[] => {
  const reflected: string[] = Array(matrix[0].length).fill("")
  for (let x = 0; x < matrix[0].length; x++) {
    matrix.forEach((line) => {
      reflected[x] += line[x]
    })
  }
  return reflected
}

export const rotateMatrixAnticlockwise = (matrix: string[]): string[] => {
  const rotated: string[] = Array(matrix[0].length).fill("")
  for (let x = 0; x < matrix[0].length; x++) {
    matrix.forEach((line) => {
      rotated[line.length - 1 - x] += line[x]
    })
  }
  return rotated
}

export const printableMatrix = (matrix: string[][]) => matrix.map(x => x.join("")).join("\n")

export const times = (count: number) => (fn: () => unknown) => {
  for (let i = 0; i < count; i++) {
    fn()
  }
}

export const withinBounds = (n: number, dimension: number) => n >= 0 && n < dimension
