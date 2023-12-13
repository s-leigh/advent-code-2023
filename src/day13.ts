import { splitInputIntoLinesWindowsStyle } from "./common"

const parseVertically = (map: string[]): string[] => {
  const vertical: string[][] = []
  for (let x = 0; x < map[0].length; x++) {
    map.forEach((line) => {
      vertical[x] ? vertical[x].push(line[x]) : vertical[x] = [line[x]]
    })
  }
  return vertical.map(x => x.join(""))
}

const parseInput = (input: string): [string[][], string[][]] => {
  const newLineRegex = /(\n\n)|(\r\n\r\n)/g
  const individualMaps = input.split(newLineRegex).filter(x => x !== undefined && (x.includes(".") || x.includes("#")))
  const horizontal = individualMaps.map(m => splitInputIntoLinesWindowsStyle(m))
  const vertical = individualMaps.map(m => parseVertically(splitInputIntoLinesWindowsStyle(m)))
  return [horizontal, vertical]
}

const mapAsBinary = (matrix: string[]): number[] =>
  matrix.map(line => line.split("").map(char => char === "#" ? 1 : 0))
    .map(line => parseInt(line.join(""), 2))

const isSymmetricalAroundIndex = (arr: number[], reflectionIndex: number): boolean => {
  const s1 = arr.slice(0, reflectionIndex - 1)
  const s2 = arr.slice(reflectionIndex + 1, arr.length)
  const shorterSideLength = s1.length < s2.length ? s1.length : s2.length
  for (let i = 0; i < shorterSideLength; i++) {
    if (s1[s1.length - 1 - i] !== s2[i]) return false
  }
  return true
}

const reflectionIndex = (array: number[]): number | undefined => {
  const possibleReflectionIndices: number[] = array.reduce((prev, curr, i, arr) => curr === arr[i - 1] ? prev.concat([i]) : prev, [] as number[])
  const actualReflectionIndices = possibleReflectionIndices.filter((i) => isSymmetricalAroundIndex(array, i))
  if (actualReflectionIndices.length > 1) throw new Error(`>1 RI found for arr ${array}: ${actualReflectionIndices}`)
  if (actualReflectionIndices.length === 0) return undefined
  return actualReflectionIndices[0]
}

export const day13Part01 = (input: string): number => {
  const [horizontal, vertical] = parseInput(input)
  const [hBin, vBin] = [horizontal, vertical].map(matrices => matrices.map(m => mapAsBinary(m)))

  const horizontalReflectionIndices = hBin.map(h => reflectionIndex(h)).filter(x => !!x)
  const verticalReflectionIndices = vBin.map(v => reflectionIndex(v)).filter(x => !!x)

  return verticalReflectionIndices.sum() + (horizontalReflectionIndices.sum() * 100)
}
