import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day08Part01, day08Part02 } from "../src/day08"

const PART_1_SAMPLE_INPUT_1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const PART_2_SAMPLE_INPUT_2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const PART_2_SAMPLE_INPUT = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

const input = fs.readFileSync("./input/day08Input").toString()

describe("Day 08", () => {
  test("Day 08 part 01 sample input 01", () => {
    const result = day08Part01(PART_1_SAMPLE_INPUT_1)
    assert.strictEqual(result, 2)
  })

  test("Day 08 part 01 sample input 02", () => {
    const result = day08Part01(PART_2_SAMPLE_INPUT_2)
    assert.strictEqual(result, 6)
  })

  test("Day 08 part 01", () => {
    const result = day08Part01(input)
    assert.strictEqual(result, 20513)
  })

  test("Day 08 part 02 sample input 01", () => {
    const result = day08Part02(PART_2_SAMPLE_INPUT)
    assert.strictEqual(result, 6)
  })

  test("Day 08 part 02", () => {
    const result = day08Part02(input)
    assert.strictEqual(result, 15995167053923)
  })
})
