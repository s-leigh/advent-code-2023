import { splitInputIntoLines } from "./common"

const lastDeltasSum = (input: number[], result: number = 0): number => {
  if (input.every(x => x === 0)) return result
  const deltas: number[] = input.reduce((prev, curr, currI, arr) => {
    if (currI > 0) {
      prev.push(curr - arr[currI - 1])
    }
    return prev
  }, [] as number[])
  return lastDeltasSum(deltas, result + deltas.last())
}

const parseInput = (input: string): number[][] =>
  splitInputIntoLines(input).map(l => l.split(" ").map(s => parseInt(s)))

export const day09Part01 = (input: string): number => {
  const lines = parseInput(input)
  const deltaSums = lines.map(l => lastDeltasSum(l))
  return lines.reduce((prev, currL, i) => prev + currL.last() + deltaSums[i], 0)
}

export const day09Part02 = (input: string): number => {
  const lines = parseInput(input).map(arr => arr.reverse())
  const deltaSums = lines.map(l => lastDeltasSum(l))
  return lines.reduce((prev, currL, i) => prev + currL.last() + deltaSums[i], 0)
}
