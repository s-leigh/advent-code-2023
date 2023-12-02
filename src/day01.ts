import { splitInputIntoLines } from "./common"

const part01Regex = /(?=([0-9]))/g
const part02Regex = /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g

const wordToDigit = {
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

export const day01Part01 = (input: string) => sum(input, part01Regex)
export const day01Part02 = (input: string) => sum(input, part02Regex)

const sum = (input: string, regex: RegExp): number => {
  const numbers = splitInputIntoLines(input)
    .map(line => regexIterator(line, regex)
      ?.filter(match => match !== null)
      .map(match => match.length > 1 ? wordToDigit[match as keyof typeof wordToDigit] : match)
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    )

  const combined = numbers.filter(l => !!l).map(line => line!.length === 1 ? line!.concat([line![0]]) : line)
    .map(line => line!.reduce((prev, curr) => prev + curr))

  return combined.map(strNum => parseInt(strNum)).reduce((prev, curr) => prev + curr)
}

// Undocumented in puzzle: word-numbers can overlap, e.g. "eighthree" is 8 and 3
const regexIterator = (string: string, regex: RegExp) => {
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
