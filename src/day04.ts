import { splitInputIntoLines } from "./common"

type Card = {
  winningNumbers: number[]
  cardNumbers: number[]
}

const cardValue = (card: Card): number => card.cardNumbers.reduce((prevN, currN) =>
  card.winningNumbers.includes(currN) ? (prevN === 0 ? 1 : prevN * 2) : prevN
, 0)

export const day04Part01 = (input: string): number => {
  const cards = splitInputIntoLines(input).map(c => {
    const numbers = c.split(":")[1]
    const [winningNumbers, cardNumbers] = numbers.split("|").map(l =>
      l.split(" ").filter(s => s !== " " && s !== "").map(x => parseInt(x))
    )
    return {winningNumbers, cardNumbers}
  })

  return cards.map(c => cardValue(c)).reduce((prev, curr) => prev + curr)
}
