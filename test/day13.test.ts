import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day13Part01, day13Part02 } from "../src/day13"

const sampleInput = fs.readFileSync("./input/day13SampleInput").toString()
const input = fs.readFileSync("./input/day13Input").toString()

describe("Day 13", () => {
  test("Day 13 part 01 sample input", () => {
    const result = day13Part01(sampleInput)
    assert.strictEqual(result, 405)
  })

  test("Day 13 part 01", () => {
    const result = day13Part01(input)
    assert.strictEqual(result, 43614)
  })

  test("Day 13 part 02 sample input", () => {
    const result = day13Part02(sampleInput)
    assert.strictEqual(result, 400)
  })

  test("Day 13 part 02", () => {
    const result = day13Part02(input)
    assert.strictEqual(result, 36771)
  })
})
