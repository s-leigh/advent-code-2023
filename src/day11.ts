import { splitInputIntoLines } from "./common"

const expandUniverse = (universe: string[][]) => {
  const emptyColumnFieldCount: number[] = Array(universe[0].length).fill(0)
  const emptyRowIndices: number[] = []
  universe.forEach((row, y) => {
    if (row.every(elem => elem === "." || elem === "\r")) emptyRowIndices.push(y)
    row.forEach((elem, x) => {
      if (elem === ".") emptyColumnFieldCount[x]++
    })
  })
  const emptyColumnIndices = emptyColumnFieldCount.reduce((acc, curr, i) => curr === universe.length ? acc.concat([i]) : acc, [] as number[])
  emptyColumnIndices.forEach((eci, delta) => { // index increases each time we add a line
    universe.forEach(row => row.splice(eci + delta, 0, "."))
  })
  emptyRowIndices.forEach((eri, delta) => {
    const newIndex = eri + delta
    universe.splice(newIndex, 0, universe[newIndex])
  })
}

const uniquePairs = (arr: number[][]) => arr.flatMap((coOrds1, i) => arr.slice(i + 1).map(coOrds2 => [coOrds1, coOrds2]))

export const day11Part01 = (input: string): number => {
  const universe = splitInputIntoLines(input).map(line => line.split(""))
  expandUniverse(universe)

  const galaxyCoords: number[][] = []
  universe.forEach((row, y) => {
    row.forEach((elem, x) => {
      if (elem === "#") galaxyCoords.push([x, y])
    })
  })

  const pathLengths = uniquePairs(galaxyCoords).map(([[x1, y1], [x2, y2]]) => Math.abs(x1 - x2) + Math.abs(y1 - y2))
  return pathLengths.sum()
}
