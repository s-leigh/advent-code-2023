import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day21Part01 } from "../src/day21"

const SAMPLE_INPUT = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

const input = fs.readFileSync("./input/day21Input").toString()

describe("Day 21", () => {
  test("Day 21 part 01 sample input", () => {
    const result = day21Part01(SAMPLE_INPUT, 6)
    assert.strictEqual(result, 16)
  })

  test("Day 21 part 01", () => {
    const result = day21Part01(input, 64)
    assert.strictEqual(result, 3782)
  })
})
