import { splitInputIntoLines, times } from "./common"

interface HasChildren {
  children: string[]
}

type FlipFlop = HasChildren & {
  state: "on" | "off"
}

type Conjunction = HasChildren & {
  mostRecent: Map<string, "low" | "high">
}

type Broadcast = HasChildren

type Module = FlipFlop | Conjunction | Broadcast

type PulseCount = { low: number, high: number }

const isFlipFlop = (module: Module): module is FlipFlop => (<FlipFlop>module).state !== undefined
const isConjunction = (module: Module): module is Conjunction => (<Conjunction>module).mostRecent !== undefined

const parseInput = (splitInput: string[]): Map<string, Module> => {
  const modules: Map<string, Module> = new Map()
  const conjunctionModules: string[] = []
  splitInput.forEach(line => {
    const [m, targets] = line.split(" -> ")
    const children = targets.split(", ")
    if (m[0] === "%") {
      modules.set(m.substring(1), { state: "off", children })
    } else if (m[0] === "&") {
      modules.set(m.substring(1), { mostRecent: new Map(), children })
      conjunctionModules.push(m.substring(1))
    } else {
      // broadcaster or no-op type
      modules.set(m, { children })
    }
  })
  conjunctionModules.forEach(cj => {
    [...modules.keys()].forEach(m => {
      if (modules.get(m)!.children.includes(cj)) {
        (<Conjunction>modules.get(cj)).mostRecent.set(m, "low")
      }
    })
  })
  return modules
}

const processChildren = (pulse: "low" | "high", source: string, children: string[], allModules: Map<string, Module>, pulseCount: PulseCount = { low: 0, high: 0 }): PulseCount => {
  const furtherPulses: ["low" | "high", string, string[]][] = []
  children.forEach(childName => {
    pulseCount[pulse] = pulseCount[pulse] + 1
    const child = allModules.get(childName)
    if (!child) return pulseCount
    if (isFlipFlop(child) && pulse === "low") {
      if (child.state === "off") {
        child.state = "on"
        furtherPulses.push(["high", childName, child.children])
      } else {
        child.state = "off"
        furtherPulses.push(["low", childName, child.children])
      }
    } else if (isConjunction(child)) {
      child.mostRecent.set(source, pulse)
      if ([...child.mostRecent.values()].includes("low")) {
        furtherPulses.push(["high", childName, child.children])
      } else {
        furtherPulses.push(["low", childName, child.children])
      }
    } else if (childName === "broadcaster") {
      furtherPulses.push([pulse, childName, child.children])
    }
  })
  furtherPulses.forEach(([p, src, c]) => {
    return processChildren(p, src, c, allModules, pulseCount)
  })
  return pulseCount
}

export const day20Part01 = (input: string): number => {
  const modules = parseInput(splitInputIntoLines(input))
  const runningPulseCount: PulseCount = { low: 0, high: 0 }
  times(1000)(() => {
    const pc = processChildren("low", "button", ["broadcaster"], modules)
    runningPulseCount.low += pc.low
    runningPulseCount.high += pc.high
  })
  return runningPulseCount.low * runningPulseCount.high
}
