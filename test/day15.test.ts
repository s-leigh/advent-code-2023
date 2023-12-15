import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day15Part01, day15Part02 } from "../src/day15"

const SAMPLE_INPUT = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"

const input = fs.readFileSync("./input/day15Input").toString()

describe("Day 15", () => {
  test("Day 15 part 01 sample input", () => {
    const result = day15Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 1320)
  })

  test("Day 15 part 01", () => {
    const result = day15Part01(input)
    assert.strictEqual(result, 517015)
  })

  test("Day 15 part 02 sample input", () => {
    const result = day15Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 145)
  })
  
  test("Day 15 part 02", () => {
    const result = day15Part02(input)
    assert.strictEqual(result, 286104)
  })
})
