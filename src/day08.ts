import { splitInputIntoLines } from "./common"

type Direction = "L" | "R"

type Node = {
  [K in Direction]: string
}

const parseInput = (input: string): [Direction[], Map<string, Node>] => {
  const inputLineAsNode = (inputLine: string): Node => {
    const [L, R] = [inputLine.split(",")[0].slice(-3), inputLine.split(",")[1].slice(1, 4)]
    return { L, R }
  }
  const inputAsLines = splitInputIntoLines(input)
  const directions = inputAsLines[0].split("").filter(x => x !== "\r") as Direction[]
  const nodes = inputAsLines.slice(2).reduce((acc, l) => {
    acc.set(l.slice(0, 3), inputLineAsNode(l))
    return acc
  }, new Map<string, Node>())
  return [directions, nodes]
}

export const day08Part01 = (input: string): number => {
  const [directions, nodes] = parseInput(input)

  let numberOfSteps = 0
  let currentNode: Node = nodes.get("AAA")!
  while (currentNode !== nodes.get("ZZZ")) {
    directions.forEach(dir => {
      const nextNode = nodes.get(currentNode[dir])!
      currentNode = nextNode
      numberOfSteps++
    })
  }
  return numberOfSteps
}

export const day08Part02 = (input: string): number => {
  const [directions, nodes] = parseInput(input)

  const lastLetter = (s: string) => s[s.length - 1]

  const currentNodes: Map<string, Node> = [...nodes.keys()]
    .filter(k => lastLetter(k) === "A")
    .reduce((acc, k) => {
      acc.set(k, nodes.get(k)!)
      return acc
    }, new Map<string, Node>())

  let numberOfSteps = 0
  const loopSizes: number[] = []
  while (currentNodes.size > 0) {
    directions.forEach(dir => {
      [...currentNodes.keys()].forEach(currentKey => {
        const newKey = nodes.get(currentKey)![dir]
        if (lastLetter(newKey) === "Z") {
          loopSizes.push(numberOfSteps + 1)
        } else {
          currentNodes.set(newKey, nodes.get(newKey)!)
        }
        currentNodes.delete(currentKey)
      })
      numberOfSteps++
    })
  }

  const greatestCommonDenominator = (a: number, b: number) => {
    while (b > 0) [a, b] = [b, a % b]
    return a
  }
  const lowestCommonMultiple = (a: number, b: number) => (a * b) / greatestCommonDenominator(a, b)

  return loopSizes.reduce((acc, curr) => lowestCommonMultiple(curr, acc), 1)
}
