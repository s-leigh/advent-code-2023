import { splitInputIntoLines, withinBounds } from "./common"

const parseInput = (splitInput: string[]): [Map<string, boolean>, string] => {
  const map = new Map()
  let startingCoords = ""
  splitInput.forEach((l, y) => {
    l.split("").forEach((c, x) => {
      if (c === ".") map.set(`${x},${y}`, false)
      else if (c === "S") {
        startingCoords = `${x},${y}`
        map.set(startingCoords, true)
      }
    })
  })
  return [map, startingCoords]
}

const validFinishingPositions = (
  coords: string[],
  map: Map<string, boolean>,
  squareWidth: number,
  stepsLeft: number,
  validPositions: number = 1
): number => {
  if (stepsLeft === 0) return validPositions
  coords.forEach(s => map.set(s, true))

  const nextMoves: string[] = coords.reduce((acc, curr) => {
    const [x, y] = curr.split(",").map(n => parseInt(n))
    if (withinBounds(x - 1, squareWidth)) acc.push(`${x - 1},${y}`)
    if (withinBounds(x + 1, squareWidth)) acc.push(`${x + 1},${y}`)
    if (withinBounds(y - 1, squareWidth)) acc.push(`${x},${y - 1}`)
    if (withinBounds(y + 1, squareWidth)) acc.push(`${x},${y + 1}`)
    return acc
  }, [] as string[])
    .filter(m => map.has(m) && !map.get(m))
    .removeDuplicates()

  const newValidPositions = stepsLeft % 2 === 1 ? validPositions + nextMoves.length : validPositions
  return validFinishingPositions(nextMoves, map, squareWidth, stepsLeft - 1, newValidPositions)
}

export const day21Part01 = (input: string, stepLimit: number): number => {
  const splitInput = splitInputIntoLines(input)
  const [map, startingCoords] = parseInput(splitInput)
  return validFinishingPositions([startingCoords], map, splitInput.length, stepLimit)
}
