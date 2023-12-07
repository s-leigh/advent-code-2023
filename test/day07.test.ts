import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day07Part01 } from "../src/day07"

const SAMPLE_INPUT = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

const input = fs.readFileSync("./input/day07Input").toString()

describe("Day 07", () => {
  test("Day 07 part 01 sample input", () => {
    const result = day07Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 6440)
  })

  test("Day 07 part 01", () => {
    const result = day07Part01(input)
    assert.strictEqual(result, 253205868)
  })
})
