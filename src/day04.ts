import { splitInputIntoLines } from "./common"

type Card = {
  winningNumbers: Set<number>
  cardNumbers: Set<number>
  matchingWinnersCount: number
}

const parseCards = (splitInput: string[]): Card[] => splitInput.map(card => {
  const numbersSide = card.split(/[:|]/g).slice(1)
  const [winningNumbers, cardNumbers] = numbersSide.map(linePart =>
    linePart.split(" ").filter(s => s !== "").map(x => parseInt(x))
  ).map(arr => new Set(arr))
  const matchingWinnersCount = [...winningNumbers].filter(wn => cardNumbers.has(wn)).length
  return { winningNumbers, cardNumbers, matchingWinnersCount }
})

const iterateWinners = (cards: Map<number, number>, winners: Map<number, number>, iteration: number = 0): void => {
  if (iteration === winners.size) return
  // "Cards will never make you copy a card past the end of the table."
  const numberOfCards = cards.get(iteration)!
  const winnerCount = winners.get(iteration)!
  for (let winnerLoopI = 1; winnerLoopI <= winnerCount; winnerLoopI++) {
    const indexToUpdate = iteration + winnerLoopI
    const currVal = cards.get(indexToUpdate)
    cards.set(indexToUpdate, currVal! + numberOfCards)
  }
  return iterateWinners(cards, winners, iteration + 1)
}

export const day04Part01 = (input: string): number => {
  const cards = parseCards(splitInputIntoLines(input))
  const cardValue = (numberOfMatches: number): number => [0, 1].includes(numberOfMatches) ? numberOfMatches : Math.pow(2, numberOfMatches) / 2
  return cards.map(c => cardValue(c.matchingWinnersCount)).sum()
}

export const day04Part02 = (input: string): number => {
  const cards = parseCards(splitInputIntoLines(input))

  const talliedCards = new Map<number, number>()
  const winnerCounts = new Map<number, number>()
  cards.forEach((c, i) => {
    talliedCards.set(i, 1)
    winnerCounts.set(i, c.matchingWinnersCount)
  })

  iterateWinners(talliedCards, winnerCounts)
  return [...talliedCards.values()].sum()
}
