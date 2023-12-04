import { splitInputIntoLines } from "./common"

const PART_1_REGEX = /(?<number>[0-9]+)|(?<symbol>[^.|\r])/g
const PART_2_REGEX = /(?<number>[0-9]+)|(?<symbol>\*)/g

type Element = {
  x: number,
  y: number,
  contents: string,
  type: "symbol" | "number"
}

const parseInput = (
  splitInput: string[],
  regex: RegExp,
  output: Element[][] = [[], []],
  yIndex: number = 0
): Element[][] => {
  if (splitInput.length === 0) return output
  const newSymbols = []
  const newNumbers = []
  for (const match of splitInput[0].matchAll(regex)) {
    const type: "symbol" | "number" = match.groups?.symbol ? "symbol" : "number"
    const element = {
      x: match.index!,
      y: yIndex,
      contents: match[0],
      type
    }
    type === "symbol" ? newSymbols.push(element) : newNumbers.push(element)
  }
  const newOutput = [output[0].concat(newSymbols), output[1].concat(newNumbers)]
  return parseInput(splitInput.slice(1), regex, newOutput, yIndex + 1)
}

const nearbyNumbers = (symbol: Element, numbers: Element[]): Element[] => {
  const linesToCheck = [symbol.y - 1, symbol.y, symbol.y + 1]
  const columnsToCheck = (number: Element) => {
    const xCoords = [symbol.x - number.contents.length, symbol.x - 1, symbol.x, symbol.x + 1]
    if (number.contents.length === 3) xCoords.push(symbol.x - 2)
    return xCoords
  }
  return numbers.filter(e => linesToCheck.includes(e.y) && columnsToCheck(e).includes(e.x))
}

export const day03Part01 = (input: string): number => {
  const [symbols, numbers] = parseInput(splitInputIntoLines(input), PART_1_REGEX)
  const partNumbers = symbols.flatMap((s) => nearbyNumbers(s, numbers))
  return partNumbers.map(e => parseInt(e.contents)).sum()
}

export const day03Part02 = (input: string): number => {
  const [asterisks, numbers] = parseInput(splitInputIntoLines(input), PART_2_REGEX)
  const nearAsterisk: Element[][] = asterisks.map(a => nearbyNumbers(a, numbers))

  const gears = nearAsterisk.filter(elements => elements.length == 2)
  return gears
    .map(e => parseInt(e[0].contents) * parseInt(e[1].contents))
    .sum()
}
