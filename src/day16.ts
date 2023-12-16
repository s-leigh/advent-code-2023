import { splitInputIntoLinesWindowsStyle } from "./common"

const withinYBounds = (y: number, matrixLength: number) => y >= 0 && y < matrixLength
const withinXBounds = (x: number, matrixWidth: number) => x >= 0 && x < matrixWidth

const generateTodos = (element: string, coords: [number, number, string], matrixLength: number, matrixWidth: number): [number, number, string][] => {
  const todo: [number, number, string][] = []
  const [x, y, direction] = coords
  if ((direction === "R" || direction === "L") && element === "|") {
    if (withinYBounds(y + 1, matrixLength)) todo.push([x, y + 1, "D"])
    if (withinYBounds(y - 1, matrixLength)) todo.push([x, y - 1, "U"])
  }
  if ((direction === "U" || direction === "D") && element === "-") {
    if (withinXBounds(x + 1, matrixWidth)) todo.push([x + 1, y, "R"])
    if (withinXBounds(x - 1, matrixWidth)) todo.push([x - 1, y, "L"])
  }
  if (element === "\\") {
    if (direction === "R") {
      if (withinYBounds(y + 1, matrixLength)) todo.push([x, y + 1, "D"])
    }
    if (direction === "L") {
      if (withinYBounds(y - 1, matrixLength)) todo.push([x, y - 1, "U"])
    }
    if (direction === "U") {
      if (withinXBounds(x - 1, matrixWidth)) todo.push([x - 1, y, "L"])
    }
    if (direction === "D") {
      if (withinXBounds(x + 1, matrixWidth)) todo.push([x + 1, y, "R"])
    }
  }
  if (element === "/") {
    if (direction === "L") {
      if (withinYBounds(y + 1, matrixLength)) todo.push([x, y + 1, "D"])
    }
    if (direction === "R") {
      if (withinYBounds(y - 1, matrixLength)) todo.push([x, y - 1, "U"])
    }
    if (direction === "U") {
      if (withinXBounds(x + 1, matrixWidth)) todo.push([x + 1, y, "R"])
    }
    if (direction === "D") {
      if (withinXBounds(x - 1, matrixWidth)) todo.push([x - 1, y, "L"])
    }
  }
  return todo
}

const mustHandleSplitter = (element: string, direction: string): boolean => {
  if (element === "\\" || element === "/") return true
  if (element === "|" && (direction === "L" || direction === "R")) return true
  if (element === "-" && (direction === "U" || direction === "D")) return true
  return false
}

const handledBeams: string[] = []
const visitedCoords: string[] = []
export const day16Part01 = (input: string): number => {
  const matrix = splitInputIntoLinesWindowsStyle(input).map(s => s.split(""))

  let todo: [number, number, string][] = []

  let [currentX, currentY, currentDir] = [0, 0, "R"]

  for (let x = 0; x < matrix[0].length; x++) {
    currentX = x
    addToHandled(currentX, currentY, currentDir)
    addToVisited(currentX, currentY)
    if (mustHandleSplitter(matrix[currentY][currentX], currentDir)) {
      todo = generateTodos(matrix[currentY][currentX], [currentX, currentY, currentDir], matrix.length, matrix[0].length)
      break
    }
  }
  handleTodos(matrix, todo)
  return visitedCoords.length
}

const handleTodos = (matrix: string[][], todo: [number, number, string][]): void => {
  if (todo.length === 0) return
  const newTodos: [number, number, string][] = []
  todo.forEach((td) => {
    if (td[2] === "D") {
      for (let y = td[1]; y < matrix.length; y++) {
        if (alreadyHandled(td[0], y, "D")) break
        addToVisited(td[0],y)
        addToHandled(td[0], y, "D")
        if (mustHandleSplitter(matrix[y][td[0]], "D")) {
          newTodos.push(...generateTodos(matrix[y][td[0]], [td[0], y, "D"], matrix.length, matrix[0].length))
          break
        }
      }
    }
    if (td[2] === "U") {
      for (let y = td[1]; y >= 0; y--) {
        addToVisited(td[0],y)
        addToHandled(td[0], y, "U")
        if (mustHandleSplitter(matrix[y][td[0]], "U")) {
          newTodos.push(...generateTodos(matrix[y][td[0]], [td[0], y, "U"], matrix.length, matrix[0].length))
          break
        }
      }
    }
    if (td[2] === "L") {
      for (let x = td[0]; x >= 0; x--) {
        if (alreadyHandled(x, td[1], "L")) break
        addToVisited(x,td[1])
        addToHandled(x, td[1], "L")
        if (mustHandleSplitter(matrix[td[1]][x], "L")) {
          newTodos.push(...generateTodos(matrix[td[1]][x], [x, td[1], "L"], matrix.length, matrix[0].length))
          break
        }
      }
    }
    if (td[2] === "R") {
      for (let x = td[0]; x < matrix[0].length; x++) {
        if (alreadyHandled(x, td[1], "R")) break
        addToVisited(x,td[1])
        addToHandled(x, td[1], "R")
        if (mustHandleSplitter(matrix[td[1]][x], "R")) {
          newTodos.push(...generateTodos(matrix[td[1]][x], [x, td[1], "R"], matrix.length, matrix[0].length))
          break
        }
      }
    }
  })

  return handleTodos(matrix, newTodos)
}

const addToHandled = (x: number, y: number, dir: string) => {
  const hash = x.toString() + y.toString() + dir
  if (!alreadyHandled(x, y, dir)) handledBeams.push(hash)
}

const alreadyHandled = (x: number, y: number, dir: string) => handledBeams.includes(x.toString() + y.toString() + dir)

const alreadyVisited = (x: number, y: number) => visitedCoords.includes(x.toString() + y.toString())

const addToVisited = (x: number, y: number) => {
  const hash = x.toString() + y.toString()
  if (!alreadyVisited(x, y)) visitedCoords.push(hash)
}