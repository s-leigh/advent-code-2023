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

export const day09Part01 = (input: string): number => {
  const lines = splitInputIntoLines(input).map(l => l.split(" ").map(s => parseInt(s)))
  const deltas = lines.map(l => getDeltas(l))
  const deltaSums = deltas.map(deltasForLine => deltasForLine.map(d => d.last()).sum())
  return lines.map(l => l.last()).map((x, i) => x + deltaSums[i]).sum()
}
