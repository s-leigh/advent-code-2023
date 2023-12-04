import { describe, test } from "node:test"
import assert from "node:assert"
import { day04Part01, day04Part02 } from "../src/day04"
import fs from "fs"

const SAMPLE_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
const input = fs.readFileSync("./input/day04Input").toString()

describe("Day 04", () => {
  test("Day 04 part 01 sample input", () => {
    const result = day04Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 13)
  })

  test("Day 04 part 01", () => {
    const result = day04Part01(input)
    assert.strictEqual(result, 24542)
  })

  test("Day 04 part 02 sample input", () => {
    const result = day04Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 30)
  })

  test("Day 04 part 02", () => {
    const result = day04Part02(input)
    assert.strictEqual(result, 8736438)
  })
})
