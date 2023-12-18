import { splitInputIntoLines } from "./common"

export const day18Part01 = (input: string): number => {
  const instructions: [string, number][] = splitInputIntoLines(input).map(l => [l.split(" ")[0], parseInt(l.split(" ")[1])])

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
