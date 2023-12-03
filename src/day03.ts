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

const isNearSymbol = (number: Element, symbol: Element): boolean => {
  const isValidY = Math.abs(symbol.y - number.y) <= 1
  if (!isValidY) return false
  return Math.abs(number.x - symbol.x) <= 1 || (number.x < symbol.x && symbol.x - number.x <= number.contents.length)
}

// We only need to check the rows above, equal to and below the symbol
const numbersToCheck = (symbol: Element, elements: Element[], totalLength: number): Element[] => {
  const linesToCheck = [symbol.y - 1, symbol.y, symbol.y + 1].filter(x => x >= 0 && x <= totalLength - 1)
  return elements.filter(e => linesToCheck.includes(e.y))
}

export const day03Part01 = (input: string): number => {
  const splitInput = splitInputIntoLines(input)
  const [symbols, numbers] = parseInput(splitInput, PART_1_REGEX)
  const partNumbers = symbols.flatMap((s) => numbersToCheck(s, numbers, splitInput.length).filter(n => isNearSymbol(n, s)))
  return partNumbers.reduce((prev, curr) => prev + parseInt(curr.contents), 0)
}

export const day03Part02 = (input: string): number => {
  const splitInput = splitInputIntoLines(input)
  const [asterisks, numbers] = parseInput(splitInput, PART_2_REGEX)
  const nearAsterisk: Element[][] = []
  asterisks.forEach((asterisk, asteriskI) =>
    numbersToCheck(asterisk, numbers, splitInput.length).forEach(n => {
      if (isNearSymbol(n, asterisk)) {
        nearAsterisk[asteriskI] ? nearAsterisk[asteriskI].push(n) : nearAsterisk[asteriskI] = [n]
      }
    })
  )

  const gears = nearAsterisk.filter(elements => elements.length == 2)
  return gears
    .map(e => parseInt(e[0].contents) * parseInt(e[1].contents))
    .reduce((a, b) => a + b)
}
