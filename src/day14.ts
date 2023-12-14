import { CardinalDirection, reflectMatrixDiagonally, splitInputIntoLines } from "./common"
import crypto from "crypto"

const columnWeight = (column: string[]) => column.reduce((acc, curr, i) => curr === "O" ? acc + column.length - i : acc, 0)

const northBeamsWeight = (verticallyIndexedField: string[]): number =>
  verticallyIndexedField.reduce((acc, column) => acc + columnWeight(column.split("")), 0)

const tiltField = (verticallyIndexedField: string[], direction: CardinalDirection): string[] => {
  const tiltingOverVerticalAxis = ["E", "W"].includes(direction)
  const field = tiltingOverVerticalAxis ? reflectMatrixDiagonally(verticallyIndexedField) : verticallyIndexedField
  const tilted = field.map(l =>
    l.split("#").map(subStr => {
      const length = subStr.length
      const numOs = subStr.match(/O/g)?.length
      const Os = "O".repeat(numOs || 0)
      const dots = ".".repeat(numOs ? length - numOs : length)
      return ["W", "N"].includes(direction) ? Os + dots : dots + Os
    }).join("#"))
  return tiltingOverVerticalAxis ? reflectMatrixDiagonally(tilted) : tilted
}

export const day14Part01 = (input: string): number => {
  const verticallyParsedField = reflectMatrixDiagonally(splitInputIntoLines(input))
  const transformedField = tiltField(verticallyParsedField, "N")
  return northBeamsWeight(transformedField)
}

export const day14Part02 = (input: string): number => {
  const verticallyParsedField = reflectMatrixDiagonally(splitInputIntoLines(input))

  const hashField = (field: string[]): string => crypto.createHash("sha1").update(field.toString()).digest("base64")

  const cyclesBeforeLoop: Map<string, number> = new Map() // Loop doesn't necessarily start at the beginning
  const directions: CardinalDirection[] = ["N", "W", "S", "E"]

  let finalHash: string | undefined = undefined
  let cycleCounter = 0
  let field = verticallyParsedField
  const weights: number[] = [] // Guarantee ordering unlike hash.values
  while (!finalHash) {
    directions.forEach(dir => {
      field = tiltField(field, dir)
    })
    const hash = hashField(field)
    if (cyclesBeforeLoop.has(hash)) finalHash = hash
    else {
      weights[cycleCounter] = northBeamsWeight(field)
      cyclesBeforeLoop.set(hash, cycleCounter)
      cycleCounter++
    }
  }
  const beforeLoop = cyclesBeforeLoop.get(finalHash)!
  const relevantWeights = weights.slice(beforeLoop, weights.length)
  return relevantWeights[((1000000000 - beforeLoop) % (relevantWeights.length)) - 1]
}
