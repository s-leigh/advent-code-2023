import { splitInputIntoLines } from "./common"

type RelativeDirection = "U" | "D" | "L" | "R"

const findSCoords = (map: string[][]): [x: number, y: number] => {
  let x = -1; let y = -1
  map.forEach((yVal, yI) => {
    yVal.forEach((xVal, xI) => {
      if (xVal === "S") {
        x = xI
        y = yI
      }
    })
  })
  return [x, y]
}

const getNextCameFrom = (pipeChar: string, cameFrom: RelativeDirection): RelativeDirection => {
  // console.log(`getting next came from ${cameFrom}`)
  let nextCameFrom = cameFrom
  switch (pipeChar) {
  case "L": {
    nextCameFrom = cameFrom === "U" ? "L" : "D"
    break
  }
  case "J": {
    nextCameFrom = cameFrom === "U" ? "R" : "D"
    break
  }
  case "7": {
    nextCameFrom = cameFrom === "L" ? "U" : "R"
    break
  }
  case "F": {
    nextCameFrom = cameFrom === "R" ? "U" : "L"
    break
  }
  }
  // console.log(`returning nextcamefrom ${nextCameFrom}`)
  return nextCameFrom as RelativeDirection
}

const getNextCoords = (currentPipeChar: string, cameFrom: RelativeDirection, currentX: number, currentY: number): number[] => {
  let nextX = currentX; let nextY = currentY
  // console.log(`getting next coords for pipe char ${currentPipeChar} ${currentX}, ${currentY} coming from ${cameFrom}`)
  const maybeChangeX = currentPipeChar !== '|'
  const maybeChangeY = currentPipeChar !== '-'
  if (maybeChangeX) {
    if (currentPipeChar === "-") {
      cameFrom === "L" ? nextX++ : nextX--
    }
    if (currentPipeChar === "L") {
      if (cameFrom === "U") nextX++
    }
    if (currentPipeChar === "J") {
      if (cameFrom === "U") nextX--
    }
    if (currentPipeChar === "7") {
      if (cameFrom === "D") nextX--
    }
    if (currentPipeChar === "F") {
      if (cameFrom === "D") nextX++
    }
  }
  if (maybeChangeY) {
    // higher Y = down
    if (currentPipeChar === "|") {
      cameFrom === "U" ? nextY++ : nextY--
    }
    if (currentPipeChar === "L") {
      if (cameFrom === "R") nextY--
    }
    if (currentPipeChar === "J") {
      if (cameFrom === "L") nextY--
    }
    if (currentPipeChar === "7") {
      if (cameFrom === "L") nextY++
    }
    if (currentPipeChar === "F") {
      if (cameFrom === "R") nextY++
    }
  }
  // console.log(`next coords ${nextX}, ${nextY}`)
  return [nextX, nextY]
}

const traverse = (map: string[][], currentX: number, currentY: number, cameFrom: RelativeDirection, steps: number = 1): number => {
  const currentPipeChar = map[currentY][currentX]
  console.log(`Currently at ${currentPipeChar} (${currentX}, ${currentY})`)
  // console.log(`came from ${cameFrom}`)
  // console.log(`taken steps ${steps}`)
  // if (steps > 10) throw new Error('argh')
  if (currentPipeChar === "S") return steps

  const [nextX, nextY] = getNextCoords(currentPipeChar, cameFrom as RelativeDirection, currentX, currentY)
  const nextCameFrom = getNextCameFrom(currentPipeChar, cameFrom as RelativeDirection)

  return traverse(map, nextX, nextY, nextCameFrom, steps + 1)
}

export const day10Part01 = (input: string): number => {
  const map = splitInputIntoLines(input).map(l => l.split(""))
  const [sX, sY] = findSCoords(map)

  const up = sY > 0 ? map[sY - 1][sX] : undefined
  const down = sY < map.length - 2 ? map[sY + 1][sX] : undefined
  const left = sX > 0 ? map[sY][sX - 1] : undefined
  const right = sX < map.length - 2 ? map[sY][sX + 1] : undefined
  const options = [up, down, left, right].map((char, i) => ({ char, xDelta: i < 2 ? 0 : i - 2, yDelta: i < 2 ? i - 1 : 0 }))
    .filter(({ char }) => !!char && ["|", "-", "L", "J", "7", "F"].includes(char))
  // console.log(`options ${options}`)
  const nextPipeChar = options[0]!
  // console.log(`next pipe ${nextPipeChar}`)
  const firstCameFrom = nextPipeChar.xDelta < 0 ? 'R' : nextPipeChar.xDelta > 0 ? 'L' : nextPipeChar.yDelta < 0 ? 'D' : 'U'
  const [x, y] = getNextCoords(nextPipeChar.char!, firstCameFrom as RelativeDirection, sX + nextPipeChar.xDelta, sY + nextPipeChar.yDelta)
  const nextCameFrom = getNextCameFrom(nextPipeChar.char!, firstCameFrom as RelativeDirection)

  const totalLength = traverse(map, x, y, nextCameFrom)
  return Math.ceil(totalLength / 2)
}
