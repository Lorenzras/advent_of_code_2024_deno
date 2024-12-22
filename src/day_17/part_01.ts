interface MachineState {
  regs: bigint[];
  pc: number;
  output: bigint[];
}

// Constants to access the registers by index
const REG_A = 0, REG_B = 1, REG_C = 2;

// Retrieve the argument value based on its type
const fetchArg = (state: MachineState, arg: bigint): bigint => {
  if (arg <= 3n) return arg;
  if (arg === 4n) return state.regs[REG_A];
  if (arg === 5n) return state.regs[REG_B];
  if (arg === 6n) return state.regs[REG_C];
  return 0n;
};

// Instruction set mapping
const INSTRUCTION_SET: {
  [key: string]: (state: MachineState, arg: bigint) => boolean;
} = {
  adv: (state, arg) => {
    state.regs[REG_A] = state.regs[REG_A] >> fetchArg(state, arg);
    return false;
  },
  bxl: (state, arg) => {
    state.regs[REG_B] = state.regs[REG_B] ^ arg;
    return false;
  },
  bst: (state, arg) => {
    state.regs[REG_B] = fetchArg(state, arg) & 7n;
    return false;
  },
  jnz: (state, arg) => {
    if (state.regs[REG_A] !== 0n) state.pc = Number(arg);
    return (state.regs[REG_A] !== 0n);
  },
  bxc: (state, arg) => {
    state.regs[REG_B] = state.regs[REG_B] ^ state.regs[REG_C];
    return false;
  },
  out: (state, arg) => {
    state.output.push(fetchArg(state, arg) & 7n);
    return false;
  },
  bdv: (state, arg) => {
    state.regs[REG_B] = state.regs[REG_A] >> fetchArg(state, arg);
    return false;
  },
  cdv: (state, arg) => {
    state.regs[REG_C] = state.regs[REG_A] >> fetchArg(state, arg);
    return false;
  },
};

// Opcode to instruction name mapping
const OPCODE_NAMES: string[] = [
  "adv",
  "bxl",
  "bst",
  "jnz",
  "bxc",
  "out",
  "bdv",
  "cdv",
];

// Execute the program with the initial value of register A
export const executeProgram = (initialA: bigint, instructions: bigint[]) => {
  const state: MachineState = {
    regs: [initialA, 0n, 0n],
    pc: 0,
    output: [],
  };

  while (true) {
    const opcode = instructions[state.pc];
    const argument = instructions[state.pc + 1];
    const jumped = INSTRUCTION_SET[OPCODE_NAMES[Number(opcode)]](
      state,
      argument,
    );

    // Increment program counter by 2 unless a jump occurred
    state.pc += jumped ? 0 : 2;

    if (state.pc < 0 || state.pc >= instructions.length) break;
  }

  return state;
};

export default function (input: string) {
  // Parse registers and instructions from input
  const sections = input.split("\n\n");
  const initialRegs = sections[0].split("\n").map((line) =>
    BigInt(line.split(": ")[1])
  );
  const instructionList = sections[1].split(": ")[1].split(",").map((num) =>
    BigInt(num)
  );

  return executeProgram(initialRegs[0], instructionList).output.join(",");
}
