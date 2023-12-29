import { rectanglesOverlap, splitInputIntoLines } from "./common"

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

const fallenBricks = (bricksToProcess: Brick[], processedBricks: Brick[] = [], supporting: Map<Brick, Brick[]> = new Map(), supportedBy: Map<Brick, Brick[]> = new Map()): [Brick[], Map<Brick, Brick[]>, Map<Brick, Brick[]>] => {
  if (bricksToProcess.length === 0) return [processedBricks, supporting, supportedBy]

  const thisBrick = { ...bricksToProcess[0] }
  if (thisBrick.start.z > thisBrick.end.z) throw new Error(`start z higher than end: ${JSON.stringify(thisBrick)}`)
  if (thisBrick.start.z === 1) return fallenBricks(bricksToProcess.slice(1), [thisBrick, ...processedBricks], supporting, supportedBy)

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
  return fallenBricks(bricksToProcess.slice(1), [thisBrick, ...processedBricks], supporting, supportedBy)
}

const canDestroy = (brick: Brick, supporting: Map<Brick, Brick[]>, supportedBy: Map<Brick, Brick[]>): boolean => {
  const thisBrickIsSupporting = supporting.get(brick)
  return !thisBrickIsSupporting || !thisBrickIsSupporting.some(b => supportedBy.get(b)?.length === 1)
}

export const day22Part01 = (input: string): number => {
  const bricks = parseInput(input)
  const [atRest, supporting, supportedBy] = fallenBricks(bricks)
  return atRest.filter(b => canDestroy(b, supporting, supportedBy)).length
}
