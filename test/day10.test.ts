import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day10Part01 } from "../src/day10"

const SAMPLE_INPUT_01 = `.....
.S-7.
.|.|.
.L-J.
.....`

const SAMPLE_INPUT_02 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`

const input = fs.readFileSync("./input/day10Input").toString()

describe("Day 10", () => {
  test("Day 10 part 01 sample input 01", () => {
    const result = day10Part01(SAMPLE_INPUT_01)
    assert.strictEqual(result, 4)
  })

  test("Day 10 part 01 sample input 02", () => {
    const result = day10Part01(SAMPLE_INPUT_02)
    assert.strictEqual(result, 8)
  })

  test("Day 10 part 01 ", () => {
    const result = day10Part01(input)
    assert.strictEqual(result, 6738)
  })
})