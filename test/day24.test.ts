import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day24Part01 } from "../src/day24"

const SAMPLE_INPUT = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`

const input = fs.readFileSync("./input/day24Input").toString()

describe("Day 24", () => {
  test("Day 24 part 01 sample input", () => {
    const result = day24Part01(SAMPLE_INPUT, 7, 27)
    assert.strictEqual(result, 2)
  })

  test("Day 24 part 01", () => {
    const result = day24Part01(input, 200000000000000, 400000000000000)
    assert.strictEqual(result, 20963)
  })
})
