const splitInput = (input: string) => input.split("\n")

export const day01Part01 = (input: string): number => {
  const numbers = splitInput(input)
    .map(line => line.split("")
      .filter(char => /[0-9]/.test(char))
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    )

  const combined = numbers.map(line => line.length === 1 ? line.concat([line[0]]) : line)
    .map(line => line.reduce((prev, curr) => prev + curr))

  return combined.map(strNum => parseInt(strNum)).reduce((prev, curr) => prev + curr)
}
