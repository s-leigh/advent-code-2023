import { splitInputIntoLines } from "./common"

const PART_01_REGEX = /(?=([0-9]))/g
const PART_02_REGEX = /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g
const WORD_TO_DIGIT = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
}

export const day01Part01 = (input: string) => sum(input, PART_01_REGEX)
export const day01Part02 = (input: string) => sum(input, PART_02_REGEX)

const sum = (input: string, regex: RegExp): number => {
  const numbers = splitInputIntoLines(input)
    .map(line => regexIterator(line, regex)
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .map(match => match.length > 1 ? WORD_TO_DIGIT[match as keyof typeof WORD_TO_DIGIT] : match)
    )

  const combined = numbers.map(line => line.length === 1 ? line.concat([line[0]]) : line)
    .map(line => line.reduce((prev, curr) => prev + curr))

  return combined.map(strNum => parseInt(strNum)).reduce((prev, curr) => prev + curr)
}

// Undocumented in puzzle: word-numbers can overlap, e.g. "eighthree" is 8 and 3,
// so we need to go char by char instead of consuming a whole match and going from the end of the match
const regexIterator = (string: string, regex: RegExp): string[] => {
  const results = []
  let match
  while ((match = regex.exec(string)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++
    }
    results.push(match[1])
  }
  return results
}
