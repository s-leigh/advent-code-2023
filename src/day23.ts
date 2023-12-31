import { cloneMapSingleValue, splitInputIntoLines, withinBounds } from "./common"

const mapKey = (x: number, y: number) => `${x},${y}`

const parseInput = (inputAsLines: string[]): Map<string, string[]> => {
  const map = new Map()
  const inputAsChars = inputAsLines.map(l => l.split(""))
  const yLength = inputAsChars.length
  const xLength = inputAsChars[0].length
  for (let y = 0; y < yLength; y++) {
    for (let x = 0; x < xLength; x++) {
      const char = inputAsChars[y][x]
      if (char === "#") continue
      const up = withinBounds(y-1, yLength) && inputAsChars[y-1][x] !== "#" ? mapKey(x, y-1) : undefined
      const down = withinBounds(y+1, yLength) && inputAsChars[y+1][x] !== "#" ? mapKey(x, y+1) : undefined
      const left = withinBounds(x-1, xLength) && inputAsChars[y][x-1] !== "#" ? mapKey(x-1, y) : undefined
      const right = withinBounds(x+1, xLength) && inputAsChars[y][x+1] !== "#" ? mapKey(x+1, y) : undefined
      if (char === ".") {
        map.set(mapKey(x, y), [up, down, left, right].filter(dir => !!dir))
      } else {
        if (char === "v") map.set(mapKey(x, y), down === undefined ? [] : [down])
        if (char === "<") map.set(mapKey(x, y), left === undefined ? [] : [left])
        if (char === ">") map.set(mapKey(x, y), right === undefined ? [] : [right])
      }
    }
  }
  return map
}

const traverseRoute = (curr: string, islandMap: Map<string, string[]>, endpoint: string, visited: Map<string, boolean> = new Map(), steps: number = 0): number => {
  visited.set(curr, true)
  const options = islandMap.get(curr)!.filter(coords => !visited.get(coords)!)
  if (!options.length) return -1 // dead end
  if (options?.includes(endpoint)) return steps + 1
  const next = options.map(o => traverseRoute(o, islandMap, endpoint, cloneMapSingleValue(visited), steps+1))
  return next.max()
}

export const day23Part01 = (input: string): number => {
  const startPoint = mapKey(1, 0)
  const splitInput = splitInputIntoLines(input)
  const endPoint = mapKey(splitInput[0].length - 2, splitInput.length - 1)
  const islandMap = parseInput(splitInput)
  return traverseRoute(startPoint, islandMap, endPoint)
}
