import { splitInputIntoLines } from "./common"

type GamePart = {
  red: number,
  green: number,
  blue: number
}

const getGames = (inputLines: string[]): string[][] => inputLines.map(line => line.split(":")[1].split(";"))

const getGamesWithGameParts = (games: string[][]): GamePart[][] => games.map(game => game.map(gamePart => gamePart.split(",").reduce((acc, curr) => {
  const number = parseInt(curr.split(" ")[1])
  if (curr.includes("red")) acc.red += number
  else if (curr.includes("green")) acc.green += number
  else if (curr.includes("blue")) acc.blue += number
  return acc
}, { red: 0, green: 0, blue: 0 } as GamePart)))

export const day02Part01 = (input: string): number => {
  const games = getGames(splitInputIntoLines(input))
  const gamesWithGameParts = getGamesWithGameParts(games)

  // What is possible with only 12 red cubes, 13 green cubes, and 14 blue cubes?
  const isGamePartPossible = (gamePart: GamePart): boolean =>
    gamePart.red <= 12 && gamePart.green <= 13 && gamePart.blue <= 14

  const possibleGamePartsValues = gamesWithGameParts.map(game => game.map(isGamePartPossible))
    .map((gamePartResults, i) => gamePartResults.includes(false) ? 0 : i + 1)

  return possibleGamePartsValues.reduce((prev, curr) => prev + curr)
}

export const day02Part02 = (input: string): number => {
  const games = getGames(splitInputIntoLines(input))
  const gamesWithGameParts = getGamesWithGameParts(games)

  const maximums = gamesWithGameParts.map(game => game.reduce((acc, curr) => {
    if (curr.red > acc.red) acc.red = curr.red
    if (curr.green > acc.green) acc.green = curr.green
    if (curr.blue > acc.blue) acc.blue = curr.blue
    return acc
  }, { red: 0, green: 0, blue: 0 }))

  return maximums.map(maxCubes => Object.values(maxCubes).reduce((acc, curr) => acc * curr))
    .reduce((acc, curr) => acc + curr)
}
