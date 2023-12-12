import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day11Part01, day11Part02 } from "../src/day11"

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

  test("Day 11 part 02 sample input 1", () => {
    const result = day11Part02(SAMPLE_INPUT, 10)
    assert.strictEqual(result, 1030)
  })

  test("Day 11 part 02 sample input 2", () => {
    const result = day11Part02(SAMPLE_INPUT, 100)
    assert.strictEqual(result, 8410)
  })

  test("Day 11 part 02", () => {
    const result = day11Part02(input, 1000000)
    assert.strictEqual(result, 699909023130)
  })
})
