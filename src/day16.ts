import { splitInputIntoLinesWindowsStyle } from "./common"

type CoordsAndDirections = {
  x: number
  y: number
  direction: string
}

const withinYBounds = (y: number, matrixLength: number) => y >= 0 && y < matrixLength
const withinXBounds = (x: number, matrixWidth: number) => x >= 0 && x < matrixWidth

const generateInstructions = (splitter: string, coords: CoordsAndDirections, matrixLength: number, matrixWidth: number): CoordsAndDirections[] => {
  const todo: CoordsAndDirections[] = []
  const { x, y, direction } = coords
  if (splitter === "|" && (direction === "R" || direction === "L")) {
    todo.push({ x, y: y + 1, direction: "D" }, { x, y: y - 1, direction: "U" })
  } else if (splitter === "-" && (direction === "U" || direction === "D")) {
    todo.push({ x: x + 1, y, direction: "R" }, { x: x - 1, y, direction: "L" })
  } else if (direction === "R") {
    todo.push(splitter === "\\" ? { x, y: y + 1, direction: "D" } : { x, y: y - 1, direction: "U" })
  } else if (direction === "L") {
    todo.push(splitter === "\\" ? { x, y: y - 1, direction: "U" } : { x, y: y + 1, direction: "D" })
  } else if (direction === "U") {
    todo.push(splitter === "\\" ? { x: x - 1, y, direction: "L" } : { x: x + 1, y, direction: "R" })
  } else if (direction === "D") {
    todo.push(splitter === "\\" ? { x: x + 1, y, direction: "R" } : { x: x - 1, y, direction: "L" })
  }
  return todo.filter(({ x, y }) => withinXBounds(x, matrixWidth) && withinYBounds(y, matrixLength))
}

const mustHandleSplitter = (element: string, direction: string): boolean => {
  if (element === "\\" || element === "/") return true
  if (element === "|" && (direction === "L" || direction === "R")) return true
  if (element === "-" && (direction === "U" || direction === "D")) return true
  return false
}

const visitedHash = (x: number, y: number) => x.toString() + "," + y.toString()

const addToHandled = ({ x, y, direction }: CoordsAndDirections, visitedMap: Map<string, string[]>) => {
  const hash = visitedHash(x, y)
  const existingRecord = visitedMap.get(hash)
  existingRecord ? visitedMap.set(hash, existingRecord.concat([direction])) : visitedMap.set(visitedHash(x, y), [direction])
}

const alreadyHandled = ({ x, y, direction }: CoordsAndDirections, visitedMap: Map<string, string[]>) => visitedMap.has(visitedHash(x, y)) && visitedMap.get(visitedHash(x, y))!.includes(direction)

const followLines = (matrix: string[][], lineInstructions: CoordsAndDirections[], visitedMap: Map<string, string[]>): void => {
  if (lineInstructions.length === 0) return
  const newTodos: CoordsAndDirections[] = []
  const alreadyHandledOrSplitter = (position: CoordsAndDirections): boolean => {
    if (alreadyHandled(position, visitedMap)) return true
    addToHandled(position, visitedMap)
    const element = matrix[position.y][position.x]
    if (mustHandleSplitter(element, position.direction)) {
      newTodos.push(...generateInstructions(element, position, matrix.length, matrix[0].length))
      return true
    }
    return false
  }
  lineInstructions.forEach(({ x: instructionX, y: instructionY, direction }) => {
    if (direction === "D") {
      for (let y = instructionY; y < matrix.length; y++) {
        if (alreadyHandledOrSplitter({ x: instructionX, y, direction })) break
      }
    } else if (direction === "U") {
      for (let y = instructionY; y >= 0; y--) {
        if (alreadyHandledOrSplitter({ x: instructionX, y, direction })) break
      }
    } else if (direction === "L") {
      for (let x = instructionX; x >= 0; x--) {
        if (alreadyHandledOrSplitter({ x, y: instructionY, direction })) break
      }
    } else {
      for (let x = instructionX; x < matrix[0].length; x++) {
        if (alreadyHandledOrSplitter({ x, y: instructionY, direction })) break
      }
    }
  })
  return followLines(matrix, newTodos, visitedMap)
}

export const day16Part01 = (input: string): number => {
  const matrix = splitInputIntoLinesWindowsStyle(input).map(s => s.split(""))
  const startingInstruction: CoordsAndDirections[] = [{ x: 0, y: 0, direction: "R" }]
  const visitedMap: Map<string, string[]> = new Map()
  followLines(matrix, startingInstruction, visitedMap)
  return visitedMap.size
}
