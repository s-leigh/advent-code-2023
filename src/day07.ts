import { splitInputIntoLines } from "./common"

const handStrength = (hand: string): 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  const handAsMap: Map<string, number> = new Map()
  const splitHand = hand.split("")
  splitHand.forEach(c => handAsMap.set(c, handAsMap.get(c) ? handAsMap.get(c)! + 1 : 1))

  const cardValues = [...handAsMap.values()]
  if (cardValues.includes(5)) return 7 // 5 of a kind
  if (cardValues.includes(4)) return 6 // 4 of a kind
  if (cardValues.includes(3) && cardValues.includes(2)) return 5 // full house
  if (cardValues.includes(3)) return 4 // 3 of a kind
  if (cardValues.filter(x => x === 2).length === 2) return 3 // two pair
  if (cardValues.includes(2)) return 2 // one pair
  return 1 // high card
}

const individualCardVal = (card: string): number => {
  if (!isNaN(parseInt(card))) return parseInt(card)
  const vals = { "T": 10, "J": 11, "Q": 12, "K": 13, "A": 14 }
  return vals[card as keyof typeof vals]
}

const sortedHands = (hands: string[]): number[][] => {
  const handStrengthsAndIndices = hands.map((h, i) => [handStrength(h), i])
  const sameHandStrengthSort = (a: string, b: string, i: number = 0): number => {
    if (individualCardVal(a[0]) === individualCardVal(b[0])) return sameHandStrengthSort(a.slice(1), b.slice(1), i + 1)
    return individualCardVal(a[0]) < individualCardVal(b[0]) ? -1 : 1
  }
  const sortFn = (a: number[], b: number[]) => {
    if (a[0] === b[0]) return sameHandStrengthSort(hands[a[1]], hands[b[1]])
    return a[0] < b[0] ? -1 : 1
  }
  return handStrengthsAndIndices.sort(sortFn)
}

export const day07Part01 = (input: string): number => {
  const splitInput = splitInputIntoLines(input).map(line => line.split(" "))
  const [hands, bids] = [splitInput.map(part => part[0]), splitInput.map(part => part[1]).map(x => parseInt(x))]
  const sorted = sortedHands(hands)
  return sorted.map((strengthAndOriginalI, i) => (i + 1) * bids[strengthAndOriginalI[1]]).sum()
}
