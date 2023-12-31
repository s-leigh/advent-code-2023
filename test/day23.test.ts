import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day23Part01 } from "../src/day23"

const SAMPLE_INPUT = `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`

const input = fs.readFileSync("./input/day23Input").toString()

describe("Day 23", () => {
  test("Day 23 part 01 sample input", () => {
    const result = day23Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 94)
  })

  // test("Day 23 part 01", () => {
  //   const result = day23Part01(input)
  //   assert.strictEqual(result, 94)
  // })
})
