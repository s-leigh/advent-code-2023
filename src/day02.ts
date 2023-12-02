import { splitInputIntoLines } from "./common"

type GamePart = {
  red: number,
  green: number,
  blue: number
}

// What is possible with only 12 red cubes, 13 green cubes, and 14 blue cubes?
const isGamePartPossible = (gamePart: GamePart): boolean =>
  gamePart.red <= 12 && gamePart.green <= 13 && gamePart.blue <= 14

export const day02Part01 = (input: string): number => {
  const inputLines = splitInputIntoLines(input)
  const games = inputLines.map(line => line.split(":")[1].split(";"))
  
  const gamesWithGameParts = games.map(game => game.map(gamePart => gamePart.split(",").reduce((acc, curr) => {
    const number = parseInt(curr.split(" ")[1])
    if (curr.includes("red")) acc.red += number
    else if (curr.includes("green")) acc.green += number
    else if (curr.includes("blue")) acc.blue += number
    return acc
  }, {red: 0, green: 0, blue: 0} as GamePart)))

  const possibleGamePartsValues = gamesWithGameParts.map(game => game.map(isGamePartPossible))
    .map((gamePartResults, i) => gamePartResults.includes(false) ? 0 : i + 1)

  return possibleGamePartsValues.reduce((prev, curr) => prev + curr)
}
