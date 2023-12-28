import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day14Part01, day14Part02 } from "../src/day14"

const SAMPLE_INPUT = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

const input = fs.readFileSync("./input/day14Input").toString()

describe("Day 14", () => {
  test("Day 14 part 01 sample input", () => {
    const result = day14Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 136)
  })

  test("Day 14 part 01", () => {
    const result = day14Part01(input)
    assert.strictEqual(result, 110565)
  })

  test("Day 14 part 02 sample input", () => {
    const result = day14Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 64)
  })

  test("Day 14 part 02", () => {
    const result = day14Part02(input)
    assert.strictEqual(result, 89845)
  })
})
