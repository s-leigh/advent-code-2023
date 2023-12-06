import { splitInputIntoLines } from "./common"

const distance = (holdTime: number, raceTime: number): number => (raceTime - holdTime) * holdTime

export const day06Part01 = (input: string): number => {
  const [times, winningDistances] = splitInputIntoLines(input).map(l =>
    l.split(/:|\s+/g).filterNotEmpty().map(s => parseInt(s)).filter(x => !isNaN(x))
  )
  const winnerCounts: number[] = Array(times.length).fill(0)
  times.forEach((t, raceI) => {
    for (let i = 0; i < t; i++) {
      const d = distance(i, t)
      if (d > winningDistances[raceI]) winnerCounts[raceI]++
    }
  })
  return winnerCounts.product()
}

export const day06Part02 = (input: string): number => {
  const splitInput = splitInputIntoLines(input).map(l =>
    l.split(/:/g).filterNotEmpty()
  )
  const [raceTime, winningDistance] = [splitInput[0][1], splitInput[1][1]].map(segment => segment.split(" ").filterNotEmpty().join("")).map(s => parseInt(s))

  let lowestWin = undefined
  let highestWin = undefined
  for (let i = 0; i <= raceTime; i++) {
    const possibleHighest = distance(raceTime - i, raceTime)
    const possibleLowest = distance(i, raceTime)
    if (possibleHighest > winningDistance) {
      highestWin = raceTime - i + 1
      if (lowestWin) break
    }
    if (possibleLowest > winningDistance) {
      lowestWin = i
      if (highestWin) break
    }
  }

  if (!highestWin || !lowestWin) throw new Error("Could not find highest and/or lowest")
  return highestWin - lowestWin
}
