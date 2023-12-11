import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day11Part01 } from "../src/day11"

const SAMPLE_INPUT = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

const input = fs.readFileSync("./input/day11Input").toString()

describe("Day 11", () => {
  test("Day 11 part 01 sample input", () => {
    const result = day11Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 374)
  })

  test("Day 11 part 01", () => {
    const result = day11Part01(input)
    assert.strictEqual(result, 10422930)
  })
})
