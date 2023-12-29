import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day22Part01 } from "../src/day22"

const SAMPLE_INPUT_1 = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`

const SAMPLE_INPUT_2 = `0,0,1~0,1,1
1,1,1~1,1,1
0,0,2~0,0,2
0,1,2~1,1,2`

const SAMPLE_INPUT_3 = `0,0,1~1,0,1
0,1,1~0,1,2
0,0,5~0,0,5
0,0,4~0,1,4`

const input = fs.readFileSync("./input/day22Input").toString()

describe("Day 22", () => {
  test("Day 22 part 01 sample input 1", () => {
    const result = day22Part01(SAMPLE_INPUT_1)
    assert.strictEqual(result, 5)
  })

  test("Day 22 part 01 sample input 2", () => {
    const result = day22Part01(SAMPLE_INPUT_2)
    assert.strictEqual(result, 3)
  })

  test("Day 22 part 01 sample input 3", () => {
    const result = day22Part01(SAMPLE_INPUT_3)
    assert.strictEqual(result, 2)
  })

  test("Day 22 part 01", () => {
    const result = day22Part01(input)
    assert.strictEqual(result, 492)
  })
})
