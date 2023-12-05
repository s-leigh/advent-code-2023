type AlmanacEntry = {
  destRangeStart: number
  sourceRangeStart: number
  rangeLength: number
  name: string
}

Array.prototype.filterNotEmpty = function () { return this.filter(s => s !== "") }
Array.prototype.min = function () { return this.reduce((a, b) => b < a ? b : a) }

const parseInput = (input: string): [number[], AlmanacEntry[][]] => {
  const items = input.split(/:|\n|\r/g).filterNotEmpty()
  const stringIndices = items.filter(line => isNaN(parseInt(line))).map(l => items.indexOf(l))
  const numberLines = stringIndices.map((si, i) => items.slice(si + 1, stringIndices[i + 1]))
  const seeds = numberLines[0][0].split(" ").filterNotEmpty().map(s => parseInt(s))

  const names = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"]
  const entries = numberLines.slice(1).map((section, sectionI) => {
    const nums = section.map(line => line.split(" ").map(s => parseInt(s)))
    return nums.map(entry => ({ destRangeStart: entry[0], sourceRangeStart: entry[1], rangeLength: entry[2], name: names[sectionI] }) as AlmanacEntry)
  })
  return [seeds, entries]
}

const lookupInSection = (source: number, entries: AlmanacEntry[]): number => {
  let correspondingEntry: AlmanacEntry | undefined
  entries.forEach(e => {
    if (!correspondingEntry && source >= e.sourceRangeStart && source < (e.sourceRangeStart + e.rangeLength)) {
      correspondingEntry = e
    }
  })
  return correspondingEntry ? correspondingEntry.destRangeStart - correspondingEntry.sourceRangeStart + source : source
}

const lookupAlmanac = (source: number, almanac: AlmanacEntry[][]): number => {
  if (almanac.length === 0) return source
  const result = lookupInSection(source, almanac[0])
  return lookupAlmanac(result, almanac.slice(1))
}

export const day05Part01 = (input: string) => {
  const [seeds, almanac] = parseInput(input)
  const locations = seeds.map(seed => lookupAlmanac(seed, almanac))
  return locations.min()
}
