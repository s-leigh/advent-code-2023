import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day20Part01 } from "../src/day20"

const SAMPLE_INPUT_1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`

const SAMPLE_INPUT_2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`

const input = fs.readFileSync("./input/day20Input").toString()

describe("Day 20", () => {
  test("Day 20 part 01 sample input 1", () => {
    const result = day20Part01(SAMPLE_INPUT_1)
    assert.strictEqual(result, 32000000)
  })

  test("Day 20 part 01 sample input 2", () => {
    const result = day20Part01(SAMPLE_INPUT_2)
    assert.strictEqual(result, 11687500)
  })

  test("Day 20 part 01", () => {
    const result = day20Part01(input)
    assert.strictEqual(result, 867118762)
  })
})
