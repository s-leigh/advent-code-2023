import { splitInputIntoLines } from "./common"

type GamePart = {
  red: number,
  green: number,
  blue: number
}

const gamesWithGameParts = (inputLines: string[]): GamePart[][] => {
  const games = (inputLines: string[]): string[][] => inputLines.map(line => line.split(":")[1].split(";"))
  const gameParts = (game: string): GamePart => game.split(",")
    .reduce((acc, curr) => {
      const number = parseInt(curr.split(" ")[1])
      if (curr.includes("red")) acc.red += number
      else if (curr.includes("green")) acc.green += number
      else if (curr.includes("blue")) acc.blue += number
      return acc
    }, { red: 0, green: 0, blue: 0 } as GamePart)

  return games(inputLines).map(game => game.map(gameParts))
}

const gamesPartsMaximums = (gamesWithGameParts: GamePart[][]) =>
  gamesWithGameParts.map(game => game.reduce((acc, curr) => {
    if (curr.red > acc.red) acc.red = curr.red
    if (curr.green > acc.green) acc.green = curr.green
    if (curr.blue > acc.blue) acc.blue = curr.blue
    return acc
  }, { red: 0, green: 0, blue: 0 }))

export const day02Part01 = (input: string): number => {
  const gamesParts = gamesWithGameParts(splitInputIntoLines(input))

  // What is possible with only 12 red cubes, 13 green cubes, and 14 blue cubes?
  const isGamePartPossible = (gamePart: GamePart): boolean =>
    gamePart.red <= 12 && gamePart.green <= 13 && gamePart.blue <= 14

  return gamesPartsMaximums(gamesParts)
    .reduce((prev, curr, i) => isGamePartPossible(curr) ? prev + i + 1 : prev, 0)
}

export const day02Part02 = (input: string): number => {
  const gamesParts = gamesWithGameParts(splitInputIntoLines(input))

  return gamesPartsMaximums(gamesParts)
    .map(maxCubes => Object.values(maxCubes).reduce((acc, curr) => acc * curr))
    .reduce((acc, curr) => acc + curr)
}
