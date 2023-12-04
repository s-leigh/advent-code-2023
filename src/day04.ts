import { splitInputIntoLines } from "./common"

type Card = {
  winningNumbers: number[]
  cardNumbers: number[]
  matchingWinnersCount: number
  value: number
}

const parseCards = (splitInput: string[]): Card[] => splitInput.map(c => {
  const numbers = c.split(":")[1]
  const [winningNumbers, cardNumbers] = numbers.split("|").map(l =>
    l.split(" ").filter(s => s !== " " && s !== "").map(x => parseInt(x))
  )
  const matchingWinnersCount = numberOfMatchingWinners(winningNumbers, cardNumbers)
  return { winningNumbers, cardNumbers, matchingWinnersCount, value: cardValue(matchingWinnersCount) }
})

const numberOfMatchingWinners = (winningNumbers: number[], cardNumbers: number[]): number => cardNumbers.reduce((prevN, currN) =>
  winningNumbers.includes(currN) ? prevN + 1 : prevN
, 0)

const cardValue = (matchingWinners: number): number => matchingWinners === 0 ? 0 : matchingWinners === 1 ? 1 : Math.pow(2, matchingWinners)/2

export const day04Part01 = (input: string): number => {
  const cards = parseCards(splitInputIntoLines(input))
  return cards.map(c => c.value).reduce((prev, curr) => prev + curr)
}

export const day04Part02 = (input: string): number => {
  type IndexedCard = {
    [cardNumber: string]: Card[]
  }
  // 0-indexed!!
  const cards = parseCards(splitInputIntoLines(input)).reduce((acc, curr, i) => ({...acc, [i]: [curr]}), {} as IndexedCard)
  const cardCount =  parseCards(splitInputIntoLines(input)).reduce((acc, _, i) => {acc[i.toString()] = 1; return acc}, {} as {[k: string]: number})

  Object.keys(cards).forEach(cI => {
    cards[cI].forEach(card => {
      for (let i = 0; i < card.matchingWinnersCount; i++) {
        const nextIndex = (parseInt(cI) + i + 1).toString()
        cardCount[nextIndex]++
        cards[nextIndex].push(cards[nextIndex][0])
      }
    })
  })
  return Object.values(cardCount).reduce((a, b) => a + b)
}
