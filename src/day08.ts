import { splitInputIntoLines } from "./common"

type Node = {
  L: string
  R: string
}

const inputLineAsNode = (inputLine: string): Node => {
  const [l, r] = [inputLine.split(",")[0].slice(-3), inputLine.split(",")[1].slice(1,4)]
  return {L: l, R: r}
}

export const day08Part01 = (input: string): number => {
  const inputAsLines = splitInputIntoLines(input)
  const directions = inputAsLines[0].split("").filter(x => x !== "\r")
  const nodes = inputAsLines.slice(2).reduce((acc, l) => {
    acc.set(l.slice(0,3), inputLineAsNode(l))
    return acc
  }, new Map<string, Node>())

  let numberOfSteps = 0
  let currentNode: Node = nodes.get("AAA")!
  while (currentNode !== nodes.get("ZZZ")) {
    directions.forEach(dir => {
      const nextNode = nodes.get(currentNode[dir as keyof Node])!
      currentNode = nextNode
      numberOfSteps++
    })
  }
  return numberOfSteps
}