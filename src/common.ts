declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    sum(): number
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filterNotEmpty(): Array<T>
    min(): number
    max(): number
    product(): number
  }
}

Array.prototype.sum = function () { return this.reduce((a, b) => a + b) }
Array.prototype.filterNotEmpty = function () { return this.filter(s => s !== "") }
Array.prototype.min = function () { return this.reduce((a, b) => b < a ? b : a) }
Array.prototype.max = function () { return this.reduce((a, b) => b < a ? a : b) }
Array.prototype.product = function () { return this.reduce((a, b) => a * b) }

export const splitInputIntoLines = (input: string) => input.split("\n")

export const arrayOfIndices = (length: number) => Array(length).fill(0).map((_, i) => i)
