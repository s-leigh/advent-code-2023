import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day18Part01, day18Part02 } from "../src/day18"

const SAMPLE_INPUT = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`

const input = fs.readFileSync("./input/day18Input").toString()

describe("Day 18", () => {
  test("Day 18 part 01 sample input", () => {
    const result = day18Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 62)
  })

  test("Day 18 part 01", () => {
    const result = day18Part01(input)
    assert.strictEqual(result, 58550)
  })

  test("Day 18 part 02 sample input", () => {
    const result = day18Part02(SAMPLE_INPUT)
    assert.strictEqual(result, 952408144115)
  })

  test("Day 18 part 02", () => {
    const result = day18Part02(input)
    assert.strictEqual(result, 47452118468566)
  })
})
