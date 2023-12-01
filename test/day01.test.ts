import { describe, test } from "node:test"
import assert from "node:assert"
import { day01Part01 } from "../src/day01"
import fs from 'fs'

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
        const input = fs.readFileSync('./input/day01Input').toString()
        const result = day01Part01(input)
        assert.strictEqual(result, 54388)
    })
})
