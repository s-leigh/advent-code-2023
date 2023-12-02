import { describe, test } from "node:test"
import assert from "node:assert"
import { day02Part01, day02Part02 } from "../src/day02"
import fs from "fs"

describe("Day 02", () => {
  test("Day 02 part 01 sample input ", () => {
    const sampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
    const result = day02Part01(sampleInput)
    assert.strictEqual(result, 8)
  })

  test("Day 02 part 01", () => {
    const input = fs.readFileSync("./input/day02Input").toString()
    const result = day02Part01(input)
    assert.strictEqual(result, 2600)
  })

  test("Day 02 part 02 sample input ", () => {
    const sampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
    const result = day02Part02(sampleInput)
    assert.strictEqual(result, 2286)
  })

  test("Day 02 part 02", () => {
    const input = fs.readFileSync("./input/day02Input").toString()
    const result = day02Part02(input)
    assert.strictEqual(result, 86036)
  })
})
