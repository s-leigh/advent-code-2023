import { splitInputIntoLines } from "./common"

type Category = "x" | "m" | "a" | "s"

type Part = {
  [k in Category]: number
}

type Workflow = {
  valToCompare: Category
  comparison: "<" | ">"
  const: number
  pass: string
  fail: string | Workflow
}

const parseInstructions = (instructions: string, workflow: Workflow = {} as Workflow): Workflow => {
  const commaSplitInstructions = instructions.split(",")
  if (commaSplitInstructions.length === 1) {
    workflow.fail = commaSplitInstructions[0]
    return workflow
  }
  const instruction = commaSplitInstructions[0]
  workflow.valToCompare = instruction[0] as Category
  workflow.comparison = instruction[1] as "<" | ">"
  workflow.const = parseInt(instruction.split(/[<>:]/g)[1])
  workflow.pass = instruction.split(":")[1]
  const nextBatch = commaSplitInstructions[1]
  if (!nextBatch.match(/[<>]/g)) {
    workflow.fail = nextBatch
    return workflow
  }
  workflow.fail = parseInstructions(commaSplitInstructions.slice(1).join(","))
  return workflow
}

const parseWorkflows = (workflowLines: string[]): { [name: string]: Workflow } => {
  const map: { [name: string]: Workflow } = {}
  workflowLines.forEach(l => {
    const [name, instructions] = l.split(/[{}]/g).filterNotEmpty()
    map[name] = parseInstructions(instructions)
  })
  return map
}

const executeWorkflow = (workflow: Workflow, part: Part): string => {
  const val = part[workflow.valToCompare]
  if (workflow.comparison === "<" ? val < workflow.const : val > workflow.const) return workflow.pass
  if (typeof workflow.fail === "string") return workflow.fail
  return executeWorkflow(workflow.fail, part)
}

const accepted = (workflows: { [name: string]: Workflow }, part: Part): boolean => {
  let nextWorkflow = "in"
  while (!["A", "R"].includes(nextWorkflow)) {
    nextWorkflow = executeWorkflow(workflows[nextWorkflow], part)
  }
  return nextWorkflow === "A"
}

export const day19Part01 = (input: string): number => {
  const inputSections = input.split("\n\n").map(s => splitInputIntoLines(s))
  const workflows = parseWorkflows(inputSections[0])
  const parts = inputSections[1].map(l => {
    const vals = (l.split(/[{}xmas=]/g).filterNotEmpty().map(x => parseInt(x)))
    return { x: vals[0], m: vals[1], a: vals[2], s: vals[3] }
  })
  return parts.filter(p => accepted(workflows, p))
    .reduce((acc, curr) => acc + curr.x + curr.m + curr.a + curr.s, 0)
}
