import { splitInputIntoLines } from "./common"

type Hailstone = {
  position: {
    x: number
    y: number
    z: number
  }
  velocity: {
    x: number
    y: number
    z: number
  }
  gradient: number
  printable: string
}

const parseInput = (input: string): Hailstone[] =>
  splitInputIntoLines(input).map((l, i) => {
    const [posx, posy, posz, velx, vely, velz] = l.split(" @ ").flatMap(s => s.split(", ").map(x => parseInt(x)))
    return {
      position: { x: posx, y: posy, z: posz },
      velocity: { x: velx, y: vely, z: velz },
      gradient: vely / velx,
      printable: `${posx},${posy},${posz}`
    }
  })

const hailstonesIntersect = (hailstones: [Hailstone, Hailstone]): [number, number] => {
  const c0 = hailstones[0].position.y - (hailstones[0].gradient * hailstones[0].position.x)
  const c1 = hailstones[1].position.y - (hailstones[1].gradient * hailstones[1].position.x)
  const intersectionX = (c0 - c1) / (hailstones[1].gradient - hailstones[0].gradient)
  const intersectionY = (hailstones[0].gradient * intersectionX) + c0
  return [intersectionX, intersectionY]
}

const crossWithinBounds = (hailstones: [Hailstone, Hailstone], lowerBound: number, upperBound: number): boolean => {
  if (hailstones[0].gradient === hailstones[1].gradient) return false
  const [intersectionX, intersectionY] = hailstonesIntersect(hailstones)
  const withinTargetArea = intersectionX >= lowerBound && intersectionY >= lowerBound && intersectionX <= upperBound && intersectionY <= upperBound
  const inFuture = (hailstones[0].velocity.x >= 0 ? intersectionX >= hailstones[0].position.x : intersectionX <= hailstones[0].position.x)
    && (hailstones[0].velocity.y >= 0 ? intersectionY >= hailstones[0].position.y : intersectionY <= hailstones[0].position.y)
    && (hailstones[1].velocity.x >= 0 ? intersectionX >= hailstones[1].position.x : intersectionX <= hailstones[1].position.x)
    && (hailstones[1].velocity.y >= 0 ? intersectionY >= hailstones[1].position.y : intersectionY <= hailstones[1].position.y)
  // if (withinTargetArea && inFuture) console.log(`intersection: ${hailstones[0].printable} and ${hailstones[1].printable} at ${intersectionX},${intersectionY}`)
  // if (withinTargetArea && !inFuture) console.log(`intersection inside target area in past: ${hailstones[0].printable} and ${hailstones[1].printable} at ${intersectionX},${intersectionY}`)
  // if (!withinTargetArea && inFuture) console.log(`intersection outside target area: ${hailstones[0].printable} and ${hailstones[1].printable} at ${intersectionX},${intersectionY}`)
  // if (!withinTargetArea && !inFuture) console.log(`intersection outside target area in past: ${hailstones[0].printable} and ${hailstones[1].printable} at ${intersectionX},${intersectionY}`)
  return withinTargetArea && inFuture
}

const intersectingHailstones = (hailstones: Hailstone[], lowerBound: number, upperBound: number, intersect: number = 0): number => {
  if (!hailstones.length) return intersect
  const numIntersections = hailstones.slice(1).filter(h =>
    crossWithinBounds([hailstones[0], h], lowerBound, upperBound)
  ).length
  return intersectingHailstones(hailstones.slice(1), lowerBound, upperBound, intersect + numIntersections)
}

export const day24Part01 = (input: string, lowerBound: number, upperBound: number): number => {
  const hailstones = parseInput(input)
  return intersectingHailstones(hailstones, lowerBound, upperBound)
}
