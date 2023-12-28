import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day16Part01, day16Part02 } from "../src/day16"

// Backslashes at end of line are read as escape characters when copied straight into a string
const sampleInput = fs.readFileSync("./input/day16SampleInput").toString()

const input = fs.readFileSync("./input/day16Input").toString()

describe("Day 16", () => {
  test("Day 16 part 01 sample input", () => {
    const result = day16Part01(sampleInput)
    assert.strictEqual(result, 46)
  })

  test("Day 16 part 01", () => {
    const result = day16Part01(input)
    assert.strictEqual(result, 7798)
  })

  test("Day 16 part 02 sample input", () => {
    const result = day16Part02(sampleInput)
    assert.strictEqual(result, 51)
  })

  test("Day 16 part 02", () => {
    const result = day16Part02(input)
    assert.strictEqual(result, 8026)
  })
})
