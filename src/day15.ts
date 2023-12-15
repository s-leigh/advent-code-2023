type Lens = {
  label: string
  focalLength: number
}

type Instruction = {
  label: string
  boxNumber: number
  instruction: "-" | "="
  focalLength: number
}

const hash = (input: string): number => {
  const ascii = input.split("").map(char => char.charCodeAt(0))
  let val = 0
  ascii.forEach(c => {
    val += c
    val = (val * 17)
    val = val % 256
  })
  return val
}

const lensFocusingPower = (boxNumber: number, slotNumber: number, focalLength: number): number => (boxNumber + 1) * slotNumber * focalLength

const boxFocusingPower = (lenses: Lens[], boxNo: number) => lenses.reduce((a, b, i) => a + lensFocusingPower(boxNo, i + 1, b.focalLength), 0)

export const day15Part01 = (input: string): number => input.split(",").reduce((a, b) => a + hash(b), 0)

export const day15Part02 = (input: string): number => {
  const instructions: Instruction[] = input.split(",").map(input => {
    const instruction = input.match(/-|=/)![0] as "-" | "="
    const [label, focalLength] = input.split(instruction)
    const boxNumber = hash(label)
    return { label, boxNumber, instruction, focalLength: instruction === "-" ? -1 : parseInt(focalLength) }
  })

  const boxes: Map<number, Lens[]> = new Map()
  instructions.forEach(({ label, boxNumber, instruction, focalLength }) => {
    const lenses = boxes.get(boxNumber)
    if (instruction === "=") {
      const lensToAdd: Lens = { label, focalLength }
      if (!lenses) {
        boxes.set(boxNumber, [lensToAdd])
      } else {
        const existingLensIndex = lenses.map(l => l.label).indexOf(label)
        existingLensIndex === -1 ? lenses.push(lensToAdd) : lenses[existingLensIndex] = lensToAdd
      }
    } else {
      if (!lenses) return
      const existingLensIndex = lenses.map(l => l.label).indexOf(label)
      if (existingLensIndex === -1) return
      lenses.splice(existingLensIndex, 1)
    }
  })

  return [...boxes.keys()].reduce((a, b) => a + boxFocusingPower(boxes.get(b)!, b), 0)
}
