import { describe, test } from "node:test"
import assert from "node:assert"
import { day03Part01, day03Part02 } from "../src/day03"
import fs from "fs"

const SAMPLE_INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
const input = fs.readFileSync("./input/day03Input").toString()

describe("Day 03", () => {
  test("Day 03 part 01 sample input", () => {
    const result = day03Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 4361)
  })

  test("Day 03 part 01", () => {
    const result = day03Part01(input)
    assert.strictEqual(result, 535351)
  })

  test("Day 03 part 02 sample input", () => {
    const result = day03Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 467835)
  })

  test("Day 03 part 02", () => {
    const result = day03Part02(input)
    assert.strictEqual(result, 87287096)
  })
})
