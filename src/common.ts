declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> { 
    sum(): number
  }
}

Array.prototype.sum = function () { return this.reduce((a, b) => a + b) }

export const splitInputIntoLines = (input: string) => input.split("\n")
