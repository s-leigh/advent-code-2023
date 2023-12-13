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

const differByOneBit = (a: number, b: number): boolean => isPowerOfTwo(a ^ b)

const isPowerOfTwo = (x: number): boolean => Boolean(x && (!(x & (x - 1))))

const isSymmetricalAroundIndexWithAllowance = (arr: number[], reflectionIndex: number, allowance: number): boolean => {
  const s1 = arr.slice(0, reflectionIndex - 1)
  const s2 = arr.slice(reflectionIndex + 1, arr.length)
  const shorterSideLength = s1.length < s2.length ? s1.length : s2.length
  let usedAllowance = 0
  for (let i = 0; i < shorterSideLength; i++) {
    if (s1[s1.length - 1 - i] !== s2[i]) {
      if (allowance && usedAllowance < allowance && differByOneBit(s1[s1.length - 1 - i], s2[i])) {
        usedAllowance++
      } else {
        return false
      }
    }
  }
  return usedAllowance === allowance
}

const reflectionIndexWithAllowance = (array: number[], allowance: number): number | undefined => {
  const possibleReflectionIndices: [number[], number, number][] = [] // arr, i, allowance
  const mutatedArrs: [number[], number, number][] = []
  array.forEach((val, i, arr) => {
    if (val === arr[i - 1]) possibleReflectionIndices.push([arr, i, allowance])
    if (allowance && differByOneBit(val, arr[i - 1])) {
      const copy = [...arr]
      copy[i] = arr[i - 1]
      mutatedArrs.push([copy, i, allowance - 1])
    }
  })
  const actualReflectionIndices = possibleReflectionIndices.concat(mutatedArrs)
    .filter(([arr, i, allowance]) => isSymmetricalAroundIndexWithAllowance(arr, i, allowance))
    .map(([_, i, __]) => i) // eslint-disable-line @typescript-eslint/no-unused-vars
  if (actualReflectionIndices.length > 1) throw new Error(`>1 RI found for arr ${array}: ${actualReflectionIndices}`)
  if (actualReflectionIndices.length === 0) return undefined
  return actualReflectionIndices[0]
}

export const day13Part01 = (input: string): number => {
  const [horizontal, vertical] = parseInput(input)
  const [hBin, vBin] = [horizontal, vertical].map(matrices => matrices.map(m => mapAsBinary(m)))

  const horizontalReflectionIndices = hBin.map(h => reflectionIndexWithAllowance(h, 0)).filter(x => !!x)
  const verticalReflectionIndices = vBin.map(v => reflectionIndexWithAllowance(v, 0)).filter(x => !!x)

  return verticalReflectionIndices.sum() + (horizontalReflectionIndices.sum() * 100)
}

export const day13Part02 = (input: string): number => {
  const [horizontal, vertical] = parseInput(input)
  const [hBin, vBin] = [horizontal, vertical].map(matrices => matrices.map(m => mapAsBinary(m)))

  const horizontalReflectionIndices = hBin.map(h => reflectionIndexWithAllowance(h, 1))
  const verticalReflectionIndices = vBin.map(v => reflectionIndexWithAllowance(v, 1))
  const hSum = horizontalReflectionIndices.reduce((acc, curr)=> curr ? acc! + curr : acc, 0) 
  const vSum = verticalReflectionIndices.reduce((acc, curr)=> curr ? acc! + curr : acc, 0 as number) 
  return vSum! + (hSum! * 100)
}
