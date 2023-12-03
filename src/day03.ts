import { splitInputIntoLines } from "./common"

const PART_1_REGEX = /(?<number>[0-9]+)|(?<symbol>[^.|\r])/g
const PART_2_REGEX = /(?<number>[0-9]+)|(?<symbol>\*)/g

type Element = {
  x: number,
  y: number,
  length: number,
  contents: string,
  type: "number" | "symbol"
}

const parseInput = (
  splitInput: string[],
  regex: RegExp,
  symbols: Element[] = [],
  numbers: Element[] = [],
  yIndex: number = 0
): [Element[], Element[]] => {
  if (splitInput.length === 0) return [symbols, numbers]

  const newSymbols: Element[] = []
  const newNumbers: Element[] = []
  for (const match of splitInput[0].matchAll(regex)) {
    const type: "symbol" | "number" = match.groups?.symbol ? "symbol" : "number"
    const element = {
      x: match.index!,
      y: yIndex,
      length: match.groups?.symbol ? 1 : match[0].length,
      contents: match[0],
      type
    }
    element.type === "symbol" ? newSymbols.push(element) : newNumbers.push(element)
  }

  return parseInput(splitInput.slice(1), regex, symbols.concat(newSymbols), numbers.concat(newNumbers), yIndex + 1)
}

const isNearSymbol = (number: Element, symbol: Element): boolean => {
  const isValidY = Math.abs(symbol.y - number.y) <= 1
  if (!isValidY) return false
  return Math.abs(number.x - symbol.x) <= 1 || (number.x < symbol.x && symbol.x - number.x <= number.contents.length)
}

export const day03Part01 = (input: string): number => {
  const [symbols, numbers] = parseInput(splitInputIntoLines(input), PART_1_REGEX)
  const partNumbers = symbols.flatMap(s => numbers.filter(n => isNearSymbol(n, s)))
  return partNumbers.reduce((prev, curr) => prev + parseInt(curr.contents), 0)
}

export const day03Part02 = (input: string): number => {
  const [asterisks, numbers] = parseInput(splitInputIntoLines(input), PART_2_REGEX)

  const nearAsteriskIndexed: Element[][] = []
  asterisks.forEach((asterisk, asteriskI) => numbers.forEach(n => {
    if (isNearSymbol(n, asterisk)) {
      nearAsteriskIndexed[asteriskI] ? nearAsteriskIndexed[asteriskI].push(n) : nearAsteriskIndexed[asteriskI] = [n]
    }
  }))

  const gears = nearAsteriskIndexed.filter(elements => elements.length == 2)
  return gears
    .map(e => parseInt(e[0].contents) * parseInt(e[1].contents))
    .reduce((a, b) => a + b)
}
