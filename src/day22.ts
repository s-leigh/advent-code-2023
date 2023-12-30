import { cloneMap, rectanglesOverlap, splitInputIntoLines } from "./common"

type Brick = {
  name: string | undefined
  start: {
    x: number
    y: number
    z: number
  }
  end: {
    x: number
    y: number
    z: number
  }
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const parseInput = (input: string): Brick[] =>
  splitInputIntoLines(input).map((l, i) => {
    const [sx, sy, sz, ex, ey, ez] = l.split("~").flatMap(part => part.split(",").map(x => parseInt(x)))
    return {
      name: ALPHABET[i],
      start: { x: sx, y: sy, z: sz },
      end: { x: ex, y: ey, z: ez }
    }
  }).sorted((b1, b2) => b1.start.z - b2.start.z)

const bricksOverlap = (brick1: Brick, brick2: Brick): boolean => rectanglesOverlap(
  brick1.start.x, brick1.end.x, brick1.start.y, brick1.end.y, brick2.start.x, brick2.end.x, brick2.start.y, brick2.end.y
)

const bricksAtRest = (bricksToProcess: Brick[], processedBricks: Brick[] = [], supporting: Map<Brick, Brick[]> = new Map(), supportedBy: Map<Brick, Brick[]> = new Map()): [Brick[], Map<Brick, Brick[]>, Map<Brick, Brick[]>] => {
  if (bricksToProcess.length === 0) return [processedBricks, supporting, supportedBy]

  const thisBrick = { ...bricksToProcess[0] }
  if (thisBrick.start.z > thisBrick.end.z) throw new Error(`start z higher than end: ${JSON.stringify(thisBrick)}`)
  if (thisBrick.start.z === 1) return bricksAtRest(bricksToProcess.slice(1), [thisBrick, ...processedBricks], supporting, supportedBy)

  const thisBrickIsSupportedBy = processedBricks.filter(b => bricksOverlap(b, thisBrick)).reduce((acc, curr) => {
    if (acc.length === 0 || curr.end.z > acc[0].end.z) return [curr]
    if (curr.end.z === acc[0].end.z) return [...acc, curr]
    return acc
  }, [] as Brick[])

  supportedBy.set(thisBrick, thisBrickIsSupportedBy)
  thisBrickIsSupportedBy.forEach(sb => supporting.setOrAdd(sb, thisBrick))

  const brickHeight = thisBrick.end.z - thisBrick.start.z
  thisBrick.start.z = thisBrickIsSupportedBy[0]?.end.z + 1 || 1
  thisBrick.end.z = thisBrick.start.z + brickHeight
  return bricksAtRest(bricksToProcess.slice(1), [thisBrick, ...processedBricks], supporting, supportedBy)
}

const onlySupport = (brick: Brick, supporting: Map<Brick, Brick[]>, supportedBy: Map<Brick, Brick[]>): boolean => {
  const thisBrickIsSupporting = supporting.get(brick)
  return !!thisBrickIsSupporting && thisBrickIsSupporting.some(b => supportedBy.get(b)?.length === 1)
}

const chainReactionLength = (brick: Brick, supporting: Map<Brick, Brick[]>, supportedBy: Map<Brick, Brick[]>, firstIteration: boolean = true): number => {
  const thisBrickIsSupportedBy = supportedBy.get(brick)
  const thisBrickIsSupporting = supporting.get(brick)

  // If it's the first iteration we're destroying this brick, so it doesn't matter if it's supported
  if (thisBrickIsSupportedBy?.length && !firstIteration) return 0
  if (!thisBrickIsSupporting?.length) return 1

  thisBrickIsSupporting!.forEach(brickSupportedByThisOne => {
    const supportingBricks = supportedBy.get(brickSupportedByThisOne)
    supportingBricks!.splice(supportingBricks!.indexOf(brick), 1)
  })
  return 1 + thisBrickIsSupporting.map(b => chainReactionLength(b, supporting, supportedBy, false)).sum()
}

export const day22Part01 = (input: string): number => {
  const bricks = parseInput(input)
  const [atRest, supporting, supportedBy] = bricksAtRest(bricks)
  return atRest.filter(b => !onlySupport(b, supporting, supportedBy)).length
}

export const day22Part02 = (input: string): number => {
  const bricks = parseInput(input)
  const [atRest, supporting, supportedBy] = bricksAtRest(bricks)
  const atRestSortedAsc = atRest.sorted((b1, b2) => b1.start.z - b2.start.z)
  return atRestSortedAsc.map(b => chainReactionLength(b, cloneMap(supporting), cloneMap(supportedBy)))
    .map(x => x - 1) // Comes back with total bricks that fall, not just the OTHER ones that fall
    .sum()
}
