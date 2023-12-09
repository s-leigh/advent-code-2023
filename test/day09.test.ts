import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day09Part01, day09Part02 } from "../src/day09"

const SAMPLE_INPUT = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

const input = fs.readFileSync("./input/day09Input").toString()

describe("Day 09", () => {
  test("Day 09 part 01 sample input", () => {
    const result = day09Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 114)
  })

  test("Day 09 part 01 ", () => {
    const result = day09Part01(input)
    assert.strictEqual(result, 1901217887)
  })

  test("Day 09 part 02 sample input", () => {
    const result = day09Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 2)
  })

  test("Day 09 part 02", () => {
    const result = day09Part02(input)
    assert.strictEqual(result, 905)
  })
})
