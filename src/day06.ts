import { arrayOfIndices, splitInputIntoLines } from "./common"

const distance = (holdTime: number, raceTime: number): number => (raceTime - holdTime) * holdTime

export const day06Part01 = (input: string): number => {
  const [times, winningDistances] = splitInputIntoLines(input).map(l =>
    l.split(/:|\s+/g).filterNotEmpty().map(s => parseInt(s)).filter(x => !isNaN(x))
  )

  return times.map((t, raceI) =>
    arrayOfIndices(t)
      .filter(i => distance(i, t) > winningDistances[raceI])
      .length
  ).product()
}

export const day06Part02 = (input: string): number => {
  const splitInput = splitInputIntoLines(input).map(l => l.split(/:/g).filterNotEmpty())
  const [raceTime, winningDistance] = [splitInput[0][1], splitInput[1][1]].map(segment => segment.split(" ").filterNotEmpty().join("")).map(s => parseInt(s))

  const squareRootOfBSquaredMinusFourAC = Math.sqrt(raceTime ** 2 - 4 * winningDistance)
  const highestWin = Math.floor((raceTime + squareRootOfBSquaredMinusFourAC) / 2)
  const lowestWin = Math.floor((raceTime - squareRootOfBSquaredMinusFourAC) / 2)
  return highestWin - lowestWin
}
