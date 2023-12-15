import { describe, test } from "node:test"
import assert from "node:assert"
import { reflectMatrixDiagonally, rotateMatrixAnticlockwise } from "../src/common"

describe("common", () => {
  describe("reflectMatrixDiagonally", () => {
    test("Reflects matrix correctly", () => {
      const input = ["1234567", "abcdefg", "zyxwvut", "0987654"]
      const expected = ["1az0", "2by9", "3cx8", "4dw7", "5ev6", "6fu5", "7gt4"]
      const result = reflectMatrixDiagonally(input)
      assert.deepEqual(result, expected)
    })
  })

  describe("rotateMatrixAnticlockwise", () => {
    test("Rotates matrix correctly", () => {
      const input = ["1234567", "abcdefg", "zyxwvut", "0987654"]
      const expected = ["7gt4", "6fu5", "5ev6", "4dw7", "3cx8", "2by9", "1az0"]
      const result = rotateMatrixAnticlockwise(input)
      assert.deepEqual(result, expected)
    })
  })
})
