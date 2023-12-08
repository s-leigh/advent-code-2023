import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day08Part01 } from "../src/day08"

const SAMPLE_INPUT_1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const SAMPLE_INPUT_2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const input = fs.readFileSync("./input/day08Input").toString()

describe("Day 08", () => {
  test("Day 08 part 01 sample input 01", () => {
    const result = day08Part01(SAMPLE_INPUT_1)
    assert.strictEqual(result, 2)
  })

  test("Day 08 part 01 sample input 02", () => {
    const result = day08Part01(SAMPLE_INPUT_2)
    assert.strictEqual(result, 6)
  })

  test("Day 08 part 01", () => {
    const result = day08Part01(input)
    assert.strictEqual(result, 20513)
  })
})
