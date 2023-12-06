import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day06Part01, day06Part02 } from "../src/day06"

const SAMPLE_INPUT = `Time:      7  15   30
Distance:  9  40  200`

const input = fs.readFileSync("./input/day06Input").toString()

describe("Day 06", () => {
  test("Day 06 part 01 sample input", () => {
    const result = day06Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 288)
  })

  test("Day 06 part 01", () => {
    const result = day06Part01(input)
    assert.strictEqual(result, 128700)
  })

  test("Day 06 part 02 sample input", () => {
    const result = day06Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 71503)
  })

  test("Day 06 part 02", () => {
    const result = day06Part02(input)
    assert.strictEqual(result, 39594072)
  })
})
