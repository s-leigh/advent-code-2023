import { splitInputIntoLines } from "./common"

const handStrength = (hand: string, jokers: boolean = false): 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  const handAsMap: Map<string, number> = new Map()
  hand.split("").forEach(c => handAsMap.set(c, handAsMap.get(c) ? handAsMap.get(c)! + 1 : 1))

  if (!jokers || ![...handAsMap.keys()].includes("J")) {
    const cardValues = [...handAsMap.values()]
    if (cardValues.includes(5)) return 7 // 5 of a kind
    if (cardValues.includes(4)) return 6 // 4 of a kind
    if (cardValues.includes(3) && cardValues.includes(2)) return 5 // full house
    if (cardValues.includes(3)) return 4 // 3 of a kind
    if (cardValues.filter(x => x === 2).length === 2) return 3 // two pair
    if (cardValues.includes(2)) return 2 // one pair
    return 1 // high card
  }

  let mostCommonCard: string | undefined = undefined
  handAsMap.forEach((val, key) => {
    if (!mostCommonCard) mostCommonCard = key
    else if (val > handAsMap.get(mostCommonCard)!) mostCommonCard = key
  })
  // If all cards are different, replace with highest-value card
  if (handAsMap.get(mostCommonCard!) === 1) {
    const replacementValue = hand.split("").map(c => individualCardVal(c, true)).max()
    mostCommonCard = replacementValue < 10 && replacementValue >= 2 ? replacementValue.toString() : {
      10: "T",
      12: "Q",
      13: "K",
      14: "A"
    }[replacementValue]
  }
  return handStrength(hand.replace(/J/g, mostCommonCard!))
}

const individualCardVal = (card: string, jokers: boolean = false): number => {
  if (!isNaN(parseInt(card))) return parseInt(card)
  const vals = { "T": 10, "J": jokers ? 1 : 11, "Q": 12, "K": 13, "A": 14 }
  return vals[card as keyof typeof vals]
}

const sortedHands = (hands: string[], jokers: boolean = false): number[][] => {
  const handStrengthsAndIndices = hands.map((h, i) => [handStrength(h, jokers), i])
  const sameHandStrengthSort = (a: string, b: string, i: number = 0): number => {
    const [aVal, bVal] = [individualCardVal(a[0], jokers), individualCardVal(b[0], jokers)]
    if (aVal === bVal) return sameHandStrengthSort(a.slice(1), b.slice(1), i + 1)
    return aVal - bVal
  }
  const sortFn = (a: number[], b: number[]) => {
    if (a[0] === b[0]) return sameHandStrengthSort(hands[a[1]], hands[b[1]])
    return a[0] - b[0]
  }
  return handStrengthsAndIndices.sort(sortFn)
}

export const day07Part01 = (input: string): number => {
  const splitInput = splitInputIntoLines(input).map(line => line.split(" "))
  const [hands, bids] = [splitInput.map(part => part[0]), splitInput.map(part => part[1]).map(x => parseInt(x))]
  const sorted = sortedHands(hands)
  return sorted.map((strengthAndOriginalI, i) => (i + 1) * bids[strengthAndOriginalI[1]]).sum()
}

export const day07Part02 = (input: string): number => {
  const splitInput = splitInputIntoLines(input).map(line => line.split(" "))
  const [hands, bids] = [splitInput.map(part => part[0]), splitInput.map(part => part[1]).map(x => parseInt(x))]
  const sorted = sortedHands(hands, true)
  return sorted.map((strengthAndOriginalI, i) => (i + 1) * bids[strengthAndOriginalI[1]]).sum()
}
