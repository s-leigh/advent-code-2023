// type AlmanacEntry = {
//   destRangeStart: number
//   sourceRangeStart: number
//   rangeLength: number
//   name: string
// }

// Array.prototype.filterNotEmpty = function () { return this.filter(s => s !== "") }
// Array.prototype.min = function () { return this.reduce((a, b) => b < a ? b : a) }

// const parseInput = (input: string): [number[], AlmanacEntry[][]] => {
//   const items = input.split(/:|\n|\r/g).filterNotEmpty()
//   const stringIndices = items.filter(line => isNaN(parseInt(line))).map(l => items.indexOf(l))
//   const numberLines = stringIndices.map((si, i) => items.slice(si + 1, stringIndices[i + 1]))
//   const seeds = numberLines[0][0].split(" ").filterNotEmpty().map(s => parseInt(s))

//   const names = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"]
//   const entries = numberLines.slice(1).map((section, sectionI) => {
//     const nums = section.map(line => line.split(" ").map(s => parseInt(s)))
//     return nums.map(entry => ({ destRangeStart: entry[0], sourceRangeStart: entry[1], rangeLength: entry[2], name: names[sectionI] }) as AlmanacEntry)
//   })
//   return [seeds, entries]
// }

// const lookupInSection = (source: number[], entries: AlmanacEntry[]): number[] => {
//   console.log(`handling ${source}`)
//   let correspondingEntry: AlmanacEntry | undefined
//   entries.forEach((e) => {
//     const entryAsRange = [e.sourceRangeStart, e.rangeLength]
//     if (!correspondingEntry && rangesOverlap(entryAsRange, source)) {
//     // if (!correspondingEntry && source >= e.sourceRangeStart && source < (e.sourceRangeStart + e.rangeLength)) {
//       // if (source[0]===79) { console.log(`overlap: entry range ${[e.sourceRangeStart, e.rangeLength]} source range ${source}`)}
//       correspondingEntry = e
//       console.log(correspondingEntry)

//       // console.log('bingo')
//     }
//   })
//   // if (source[0] === 79) {
//   //   console.log(correspondingEntry)
//   //   console.log(`sourcerange ${source}`)
//   //   // if (correspondingEntry) console.log(`returning ${correspondingEntry!.destRangeStart - correspondingEntry!.sourceRangeStart + source + correspondingOffset}`)
//   // }
//   let newSource = source
//   if (correspondingEntry) {
//     const expandedRange = Array.from({length: source[1]}).map((_, i) => source[0] + i)
    
//     // newSource = intersection(source, [correspondingEntry.destRangeStart, correspondingEntry.rangeLength])
//     // source[0] = source[1] === 1 ? source[0] + correspondingEntry.destRangeStart - correspondingEntry.sourceRangeStart : (
//     //   source[0] < correspondingEntry.destRangeStart ? correspondingEntry.destRangeStart : source[0]
//     // )
//     // if (source[1] > correspondingEntry.rangeLength) source[1] = correspondingEntry.rangeLength
//   }
//   console.log(`returning ${newSource}`)
//   return newSource
// }

// const intersection = (r1: number[], r2: number[]): number[] => {
//   if (!rangesOverlap) throw new Error(`No intersection found for ${r1} and ${r2}`)
//   const expandedRange = (r: number[]): number[] => Array.from({length: r[1]}).map((_, i) => r[0] + i)
//   const commonItems = expandedRange(r1).filter(x => expandedRange(r2).includes(x))
//   return [commonItems[0], commonItems.length]
// }

// const lookupAlmanac = (source: number[], almanac: AlmanacEntry[][], i = 0): number[] => {
//   console.log(`iteration ${i}`)
//   if (almanac.length === 0) return source
//   console.log(`presented with ${source}`)

//   // const results = source.map(v => [v, 1]).map(x => lookupInSection(x, almanac[0]))
//   const results = source.map(x => lookupInSection(x, almanac[0]))
//   const min = [results.min(), 1]
//   return lookupAlmanac(min, almanac.slice(1), i +1)
// }

// const rangesOverlap = (r1: number[], r2: number[]): boolean => {
//   const [r1Start, r1End] = [r1[0], r1[0] + r1[1] - 1]
//   const [r2Start, r2End] = [r2[0], r2[0] + r2[1] - 1]
//   return (r1End >= r2Start && r1Start <= r2End) || (r2End >= r1Start && r2Start <= r1End)
// }

// export const day05Part01 = (input: string) => {
//   const [seeds, almanac] = parseInput(input)
//   const locations = seeds.map(seed => lookupAlmanac([seed, 1], almanac))
//   console.log(`locations: ${locations}`)
//   return locations.map(([l]) => l).min()
// }

// export const day05Part02 = (input: string) => {
//   const [seedNumbers, almanac] = parseInput(input)
//   const seedPairs = seedNumbers.map((_, i, arr) => i % 2 === 0 ? arr.slice(i, i + 2) : [-1]).filter(sp => sp[0] !== -1)
//   // console.log(rangesOverlap([2,5], [3, 1]))
//   // const seeds = seedPairs.flatMap(sp => {
//   //   const s = [sp[0]]
//   //   for (let i = 1; i < sp[1]; i++) {
//   //     s.push(sp[0] + i)
//   //   }
//   //   return s
//   // })
//   const seedGroups = seedPairs.map(sp => Array.from({length: sp[1]}).map((_, i) => sp[0] + i))
//   console.log(`seedGroups ${seedGroups}`)
//   const locations = seedGroups.map(seedGroup => lookupAlmanac(seedGroup, almanac))
//   console.log(`locations: ${locations}`)
//   return locations.map(([l]) => l).min()
// }
