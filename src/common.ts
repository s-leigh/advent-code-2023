declare global {
  interface Array<T> {
    filterNotEmpty(): Array<T>
    last(): T
    max(): number
    min(): number
    product(): number
    removeDuplicates(): Array<T>
    sorted(compareFn: (a: T, b: T) => number): Array<T>
    sum(): number
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Map<K, V> {
    setOrAdd(key: K, value: unknown): void
  }
}

Array.prototype.filterNotEmpty = function () { return this.filter(s => s !== "") }
Array.prototype.last = function () { return this[this.length - 1] }
Array.prototype.max = function () { return this.reduce((a, b) => b < a ? a : b) }
Array.prototype.min = function () { return this.reduce((a, b) => b < a ? b : a) }
Array.prototype.product = function () { return this.reduce((a, b) => a * b, 1) }
Array.prototype.removeDuplicates = function () { return this.reduce((acc, curr) => !acc.includes(curr) ? acc.concat([curr]) : acc, []) }
Array.prototype.sorted = function <T>(compareFn: (a: T, b: T) => number) {
  const clone = [...this]
  clone.sort(compareFn)
  return clone
}
Array.prototype.sum = function () { return this.reduce((a, b) => a + b) }

Map.prototype.setOrAdd = function <K, V>(k: K, v: V) {
  this.set(k, this.get(k)?.concat(v) || [v])
}

export type CardinalDirection = "N" | "W" | "S" | "E"
export type RelativeDirection = "U" | "L" | "D" | "R"
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const splitInputIntoLines = (input: string) => input.split("\n")
export const splitInputIntoLinesWindowsStyle = (input: string) => input.split("\r\n")

export const arrayOfIndices = (length: number) => Array(length).fill(0).map((_, i) => i)

// Considers them to overlap if associated co-ordinates are equal (i.e. if r1's right edge is the same x-value as r2's left edge)
export const rectanglesOverlap = (r1x1: number, r1x2: number, r1y1: number, r1y2: number, r2x1: number, r2x2: number, r2y1: number, r2y2: number): boolean =>
  (r1x1 <= r2x2 && r1x2 >= r2x1)
  && (r1y2 >= r2y1 && r1y1 <= r2y2)

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

export const cloneMap = <K, V extends Array<unknown>>(map: Map<K, V>): Map<K, V> => {
  const clone = new Map()
  ;[...map.entries()].forEach(([k, v]) => {
    clone.set(k, [...v])
  })
  return clone
}

export const cloneMapSingleValue = <K, V>(map: Map<K,V>): Map<K, V> => {
  const clone = new Map()
  ;[...map.entries()].forEach(([k, v]) => {
    clone.set(k, v)
  })
  return clone
}
