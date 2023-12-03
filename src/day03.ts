import { splitInputIntoLines } from "./common"

const PARSING_REGEX = /(?<number>[0-9]+)|(?<symbol>[^.|\r])/g

type Element = {
  x: number,
  y: number,
  length: number,
  contents: string,
  type: "number" | "symbol"
}

const parseLine = (inputLine: string, yIndex: number): Element[] => {
  const matches = [...inputLine.matchAll(PARSING_REGEX)]
  return matches.map(match => ({
    x: match.index!,
    y: yIndex,
    length: match.groups?.symbol ? 1 : match[0].length,
    contents: match[0],
    type: match.groups?.symbol ? "symbol" : "number"
  }))
}

const isNearSymbol = (number: Element, symbol: Element): boolean => {
  const validXValues = Array(number.length).fill("").map((_, i) => number.x + i)
  const isValidX = number.x === symbol.x || validXValues.map(vx => Math.abs(vx - symbol.x)).includes(1)
  return Math.abs(symbol.y - number.y) <= 1 && isValidX
}

export const day03Part01 = (input: string): number => {
  const elements = splitInputIntoLines(input).map((inputLine, i) => parseLine(inputLine, i))

  const symbols = elements.flatMap(line => line.filter(e => e.type === "symbol"))
  const numbers = elements.flatMap(line => line.filter(e => e.type === "number"))
  const partNumbers: Element[] = []
  symbols.forEach(s => numbers.forEach(n => { if (isNearSymbol(n, s)) partNumbers.push(n) }))

  return partNumbers.reduce((prev, curr) => prev + parseInt(curr.contents), 0)
}
