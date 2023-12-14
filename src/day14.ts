import { parseVertically, splitInputIntoLines } from "./common"

export const day14Part01 = (input: string): number => {
  const field = parseVertically(splitInputIntoLines(input))

  const columnWeight = (column: string) => {
    const OIndices = column.split("").reduce((acc, curr, i) => curr === "O" ? acc.concat([i]) : acc, [] as number[])
    return OIndices.reduce((acc, curr) => acc + (column.length - curr), 0)
  }

  return field.map(column => {
    const sortedColumn = column.join("").split("#").map(subArr =>
      subArr.split("").sort((a) => a === "O" ? -1 : 1).join("")
    ).join("#")
    return columnWeight(sortedColumn)
  }).sum()
}
