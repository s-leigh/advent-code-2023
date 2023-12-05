import { describe, test } from "node:test"
import assert from "node:assert"
import fs from "fs"
import { day05Part01 } from "../src/day05"

const SAMPLE_INPUT = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

const input = fs.readFileSync("./input/day05Input").toString()

describe("Day 05", () => {
  test("Day 05 part 01 sample input", () => {
    const result = day05Part01(SAMPLE_INPUT)
    assert.strictEqual(result, 35)
  })

  test("Day 05 part 01", () => {
    const result = day05Part01(input)
    assert.strictEqual(result, 313045984)
  })
})
