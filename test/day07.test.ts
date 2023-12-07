import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day07Part01, day07Part02 } from "../src/day07"

const SAMPLE_INPUT = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

const SAMPLE_INPUT_2 = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`

const input = fs.readFileSync("./input/day07Input").toString()

describe("Day 07", () => {
  test("Day 07 part 01 sample input", () => {
    const result = day07Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 6440)
  })

  test("Day 07 part 01 sample input 2", () => {
    const result = day07Part01(SAMPLE_INPUT_2)
    assert.strictEqual(result, 6592)
  })

  test("Day 07 part 01", () => {
    const result = day07Part01(input)
    assert.strictEqual(result, 253205868)
  })

  test("Day 07 part 02 sample input", () => {
    const result = day07Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 5905)
  })

  test("Day 07 part 02 sample input 2", () => {
    const result = day07Part02(SAMPLE_INPUT_2)
    assert.strictEqual(result, 6839)  })

  test("Day 07 part 02", () => {
    const result = day07Part02(input)
    assert.strictEqual(result, 253907829)
  })
})
