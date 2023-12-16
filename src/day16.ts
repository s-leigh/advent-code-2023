import { printableMatrix, splitInputIntoLinesWindowsStyle } from "./common"

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


export const day16Part01 = (input: string): number => {
  const matrix = splitInputIntoLinesWindowsStyle(input).map(s => s.split(""))

  let todo: [number, number, string][] = []

  let [currentX, currentY, currentDir] = [0, 0, "R"]

  let handledBeams: string[] = []
  let visitedCoords: string[] = []
  for (let x = 0; x < matrix[0].length; x++) {
    currentX = x
    handledBeams = addToHandled(currentX, currentY, currentDir, handledBeams)
    visitedCoords = addToVisited(currentX, currentY, visitedCoords)
    if (mustHandleSplitter(matrix[currentY][currentX], currentDir)) {
      todo = generateTodos(matrix[currentY][currentX], [currentX, currentY, currentDir], matrix.length, matrix[0].length)
      break
    }
  }
  const visitedCoords2 = handleTodos(matrix, todo, handledBeams, visitedCoords)
  // visitedCoords.forEach(s => {
  //   const [x, y] = s.split(',').map(x => parseInt(x))
  //   matrix[y][x] = '#'
  // })
  // console.log(printableMatrix(matrix))
  return visitedCoords2.length
}

const handleTodos = (matrix: string[][], todo: [number, number, string][], handledBeams: string[], visitedCoords: string[]): string[] => {
  if (todo.length === 0) return visitedCoords
  const newTodos: [number, number, string][] = []
  todo.forEach((td) => {
    if (td[2] === "D") {
      for (let y = td[1]; y < matrix.length; y++) {
        if (alreadyHandled(td[0], y, "D", handledBeams)) break
        visitedCoords = addToVisited(td[0], y, visitedCoords)
        handledBeams = addToHandled(td[0], y, "D", handledBeams)
        if (mustHandleSplitter(matrix[y][td[0]], "D")) {
          newTodos.push(...generateTodos(matrix[y][td[0]], [td[0], y, "D"], matrix.length, matrix[0].length))
          break
        }
      }
    }
    if (td[2] === "U") {
      for (let y = td[1]; y >= 0; y--) {
        if (alreadyHandled(td[0], y, "U", handledBeams)) break
        visitedCoords = addToVisited(td[0], y, visitedCoords)
        handledBeams = addToHandled(td[0], y, "U", handledBeams)
        if (mustHandleSplitter(matrix[y][td[0]], "U")) {
          newTodos.push(...generateTodos(matrix[y][td[0]], [td[0], y, "U"], matrix.length, matrix[0].length))
          break
        }
      }
    }
    if (td[2] === "L") {
      for (let x = td[0]; x >= 0; x--) {
        if (alreadyHandled(x, td[1], "L", handledBeams)) break
        visitedCoords = addToVisited(x, td[1], visitedCoords)
        handledBeams = addToHandled(x, td[1], "L", handledBeams)
        if (mustHandleSplitter(matrix[td[1]][x], "L")) {
          newTodos.push(...generateTodos(matrix[td[1]][x], [x, td[1], "L"], matrix.length, matrix[0].length))
          break
        }
      }
    }
    if (td[2] === "R") {
      for (let x = td[0]; x < matrix[0].length; x++) {
        if (alreadyHandled(x, td[1], "R", handledBeams)) break
        visitedCoords = addToVisited(x, td[1], visitedCoords)
        handledBeams = addToHandled(x, td[1], "R", handledBeams)
        if (mustHandleSplitter(matrix[td[1]][x], "R")) {
          newTodos.push(...generateTodos(matrix[td[1]][x], [x, td[1], "R"], matrix.length, matrix[0].length))
          break
        }
      }
    }
  })

  return handleTodos(matrix, newTodos, handledBeams, visitedCoords)
}

const addToHandled = (x: number, y: number, dir: string, handledBeams: string[]): string[] => {
  const hash = x.toString() + ',' + y.toString() + dir
  if (!alreadyHandled(x, y, dir, handledBeams)) handledBeams.push(hash)
  return handledBeams
}

const alreadyHandled = (x: number, y: number, dir: string, handledBeams: string[]) => handledBeams.includes(x.toString() + ',' + y.toString() + dir)

const alreadyVisited = (x: number, y: number, visitedCoords: string[]) => visitedCoords.includes(x.toString() + ',' + y.toString())

const addToVisited = (x: number, y: number, visitedCoords: string[]): string[] => {
  const hash = x.toString() + ',' + y.toString()
  if (!alreadyVisited(x, y, visitedCoords)) visitedCoords.push(hash)
  return visitedCoords
}