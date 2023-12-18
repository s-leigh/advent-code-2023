import { RelativeDirection, splitInputIntoLines } from "./common"

const getArea = (instructions: [RelativeDirection, number][]): number => {
  let area = 0
  let perimeter = 0
  let x = 0
  let y = 0
  instructions.forEach(([dir, val]) => {
    const originalX = x
    const originalY = y
    if (dir === "R") x += val
    if (dir === "L") x -= val
    if (dir === "U") y -= val
    if (dir === "D") y += val
    area += originalX * y - x * originalY
    perimeter += val
  })
  return (area / 2) + (perimeter / 2) + 1
}

export const day18Part01 = (input: string): number => {
  const instructions: [RelativeDirection, number][] = splitInputIntoLines(input).map(l => [l.split(" ")[0] as RelativeDirection, parseInt(l.split(" ")[1])])
  return getArea(instructions)
}

export const day18Part02 = (input: string): number => {
  const directionMap: { [k: number]: RelativeDirection } = { 0: "R", 1: "D", 2: "L", 3: "U" }
  const instructions: [RelativeDirection, number][] = splitInputIntoLines(input)
    .map(l => {
      const hex = l.split(/#|\)/)[1]
      const dir = directionMap[parseInt(hex[5])]
      const val = parseInt(hex.substring(0, 5), 16)
      return [dir, val]
    })
  return getArea(instructions)
}
