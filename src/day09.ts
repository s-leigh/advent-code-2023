import { splitInputIntoLines } from "./common"

const getDeltas = (input: number[], result: number[][] = []): number[][] => {
  if (input.filter(x => x !== 0).length === 0) return result
  const deltas: number[] = input.reduce((prev, curr, currI, arr) => {
    if (currI > 0) {
      prev.push(curr - arr[currI - 1])
    }
    return prev
  }, [] as number[])
  return getDeltas(deltas, result.concat([[...deltas]]))
}

const parseInput = (input: string): number[][] =>
  splitInputIntoLines(input).map(l => l.split(" ").map(s => parseInt(s)))

const getLastDeltasSum = (line: number[]): number => getDeltas(line)
  .map(deltasForLine => deltasForLine.last()).sum()

export const day09Part01 = (input: string): number => {
  const lines = parseInput(input)
  const deltaSums = lines.map(l => getLastDeltasSum(l))
  return lines.map(l => l.last()).map((x, i) => x + deltaSums[i]).sum()
}

export const day09Part02 = (input: string): number => {
  const lines = parseInput(input).map(arr => arr.reverse())
  const deltaSums = lines.map(l => getLastDeltasSum(l))
  return lines.map(l => l.last()).map((x, i) => x + deltaSums[i]).sum()
}
