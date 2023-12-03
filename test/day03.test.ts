import { describe, test } from "node:test"
import assert from "node:assert"
import { day03Part01 } from "../src/day03"
import fs from "fs"

describe("Day 03", () => {
  test("Day 03 part 01 sample input", () => {
    const sampleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
    const result = day03Part01(sampleInput)
    assert.strictEqual(result, 4361)
  })

  test("Day 03 part 01", () => {
    const input = fs.readFileSync("./input/day03Input").toString()
    const result = day03Part01(input)
    assert.strictEqual(result, 535351)
  })
})
