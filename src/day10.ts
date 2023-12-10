import { splitInputIntoLines } from "./common"

type RelativeDirection = "U" | "D" | "L" | "R"
type PipeChar = "|" | "-" | "L"| "J"| "7"| "F"

const findSCoords = (map: string[][]): [x: number, y: number] => {
  let x = -1; let y = 0
  for (const line of map) {
    for (let xVal = 0; xVal < line.length; xVal++) {
      if (line[xVal] === "S") {
        x = xVal
        break
      }
    }
    if (x > -1) break
    y++
  }
  return [x, y]
}

const getNextCameFrom = (pipeChar: PipeChar) => (cameFrom: RelativeDirection): RelativeDirection => {
  let nextCameFrom = cameFrom
  if (pipeChar === "L") nextCameFrom = cameFrom === "U" ? "L" : "D"
  if (pipeChar === "J") nextCameFrom = cameFrom === "U" ? "R" : "D"
  if (pipeChar === "7") nextCameFrom = cameFrom === "L" ? "U" : "R"
  if (pipeChar === "F") nextCameFrom = cameFrom === "R" ? "U" : "L"
  return nextCameFrom as RelativeDirection
}

const getNextCoords = (pipeChar: PipeChar, cameFrom: RelativeDirection, currentX: number, currentY: number): [number, number] => {
  let nextX = currentX; let nextY = currentY
  if (pipeChar === "-") {
    cameFrom === "L" ? nextX++ : nextX--
  }
  if (pipeChar === "|") {
    cameFrom === "U" ? nextY++ : nextY--
  }
  if (pipeChar === "L") {
    if (cameFrom === "U") nextX++
    if (cameFrom === "R") nextY--
  }
  if (pipeChar === "J") {
    if (cameFrom === "U") nextX--
    if (cameFrom === "L") nextY--
  }
  if (pipeChar === "7") {
    if (cameFrom === "D") nextX--
    if (cameFrom === "L") nextY++
  }
  if (pipeChar === "F") {
    if (cameFrom === "D") nextX++
    if (cameFrom === "R") nextY++
  }
  return [nextX, nextY]
}

export const day10Part01 = (input: string): number => {
  const map = splitInputIntoLines(input).map(l => l.split(""))
  const [sX, sY] = findSCoords(map)

  const up = { char: map[sY - 1][sX], cameFrom: "D" }
  const down = { char: map[sY + 1][sX], cameFrom: "U" }
  const left = { char: map[sY][sX - 1], cameFrom: "R" }
  const right = { char: map[sY][sX + 1], cameFrom: "L" }
  const firstStepOptions = [up, down, left, right].filter((dir) => !!dir.char && ["|", "-", "L", "J", "7", "F"].includes(dir.char))
  const nextPipeChar = firstStepOptions[0]
  const firstCameFrom = nextPipeChar.cameFrom as RelativeDirection

  let pipeChar = nextPipeChar.char as PipeChar | "S"
  let cameFrom = firstCameFrom
  let [x, y] = [sX, sY]
  let steps = 0
  while (pipeChar !== "S") {
    [x, y] = getNextCoords(pipeChar, cameFrom, x, y)
    cameFrom = getNextCameFrom(pipeChar)(cameFrom)
    pipeChar = map[y][x] as PipeChar
    steps++
  }

  return steps / 2
}
