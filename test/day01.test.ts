import { describe, test } from "node:test"
import assert from "node:assert"
import { day01Part01, day01Part02 } from "../src/day01"
import fs from "fs"

describe("Day 01", () => {
  test("Day 01 part 01 sample input ", () => {
    const sampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`
    const result = day01Part01(sampleInput)
    assert.strictEqual(result, 142)
  })

  test("Day 01 part 01", () => {
    const input = fs.readFileSync("./input/day01Input").toString()
    const result = day01Part01(input)
    assert.strictEqual(result, 54388)
  })

  test("Day 01 part 02 sample input", () => {
    const sampleInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
    const result = day01Part02(sampleInput)
    assert.strictEqual(result, 281)
  })

  test("Day 01 part 02", () => {
    const input = fs.readFileSync("./input/day01Input").toString()
    const result = day01Part02(input)
    assert.strictEqual(result, 53515)
  })
})
