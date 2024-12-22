type Command = string;
type RobotCount = number;
type Action = string;
type Movement = { button: string; actions: Action[] };
type MovementsMap = Map<string, Movement[]>;

export const solver = (commands: Command[], numRobots: RobotCount): number => {
  let total = 0;
  for (const command of commands) {
    const commandNum = parseInt(command.split("A")[0]);
    const arrowsCommands = processNumberCommand(command);
    let shortLength = Infinity;
    for (const arrowCommand of arrowsCommands) {
      const temp = findShortestSequence(arrowCommand, numRobots);
      if (temp < shortLength) shortLength = temp;
    }
    total += shortLength * commandNum;
  }
  return total;
};

const findShortestSequence = (
  command: Command,
  numRobots: RobotCount,
  keypad = 0,
): number => {
  if (keypad === numRobots) {
    return command.length;
  }

  const nextCommand = processArrowCommand(command);
  const commandSplits = nextCommand.split("A")
    .filter((_, index, array) => index !== array.length - 1)
    .map((c) => c + "A");
  let shortest = 0;
  for (const splitCommand of commandSplits) {
    shortest += findShortestSequence(splitCommand, numRobots, keypad + 1);
  }

  return shortest;
};

const processArrowCommand = (command: Command): string => {
  let current = "A";
  let output = "";
  for (const button of command) {
    const actions = arrowMovements.get(current)!.find((move) =>
      move.button === button
    )!.actions[0];
    output += actions;
    current = button;
  }
  return output;
};

/**
 * Get the sequence of actions to produce the given command for a number pad
 * @param {Command} command The command to get the sequence for
 * @returns {string[]} The actions sequence required to produce the command
 */
const processNumberCommand = (command: Command): string[] => {
  let current = "A";
  let outputs = [""];
  for (const button of command) {
    const actions = numericMovements.get(current)!.find((move) =>
      move.button === button
    )!.actions;
    const newOutputs: string[] = [];
    for (const output of outputs) {
      for (const action of actions) {
        newOutputs.push(output + action);
      }
    }
    outputs = newOutputs;
    current = button;
  }
  return outputs;
};

const numericMovements: MovementsMap = new Map([
  ["A", [
    { button: "A", actions: ["A"] },
    { button: "0", actions: ["<A"] },
    { button: "1", actions: ["^<<A"] },
    { button: "2", actions: ["<^A", "^<A"] },
    { button: "3", actions: ["^A"] },
    { button: "4", actions: ["^^<<A"] },
    { button: "5", actions: ["<^^A", "^^<A"] },
    { button: "6", actions: ["^^A"] },
    { button: "7", actions: ["^^^<<A"] },
    { button: "8", actions: ["<^^^A", "^^^<A"] },
    { button: "9", actions: ["^^^A"] },
  ]],
  ["0", [
    { button: "A", actions: [">A"] },
    { button: "0", actions: ["A"] },
    { button: "1", actions: ["^<A"] },
    { button: "2", actions: ["^A"] },
    { button: "3", actions: ["^>A", ">^A"] },
    { button: "4", actions: ["^^<A", "^<^A"] },
    { button: "5", actions: ["^^A"] },
    { button: "6", actions: ["^^>A", ">^^A"] },
    { button: "7", actions: ["^^^<A"] },
    { button: "8", actions: ["^^^A"] },
    { button: "9", actions: ["^^^>A", ">^^^A"] },
  ]],
  ["1", [
    { button: "A", actions: [">>vA"] },
    { button: "0", actions: [">vA"] },
    { button: "1", actions: ["A"] },
    { button: "2", actions: [">A"] },
    { button: "3", actions: [">>A"] },
    { button: "4", actions: ["^A"] },
    { button: "5", actions: ["^>A", ">^A"] },
    { button: "6", actions: ["^>>A", ">>^A"] },
    { button: "7", actions: ["^^A"] },
    { button: "8", actions: ["^^>A", ">^^A"] },
    { button: "9", actions: ["^^>>A", ">>^^A"] },
  ]],
  ["2", [
    { button: "A", actions: [">vA", "v>A"] },
    { button: "0", actions: ["vA"] },
    { button: "1", actions: ["<A"] },
    { button: "2", actions: ["A"] },
    { button: "3", actions: [">A"] },
    { button: "4", actions: ["^<A", "<^A"] },
    { button: "5", actions: ["^A"] },
    { button: "6", actions: ["^>A", ">^A"] },
    { button: "7", actions: ["^^<A", "<^^A"] },
    { button: "8", actions: ["^^A"] },
    { button: "9", actions: ["^^>A", ">^^A"] },
  ]],
  ["3", [
    { button: "A", actions: ["vA"] },
    { button: "0", actions: ["v<A", "<vA"] },
    { button: "1", actions: ["<<A"] },
    { button: "2", actions: ["<A"] },
    { button: "3", actions: ["A"] },
    { button: "4", actions: ["^<<A", "<<^A"] },
    { button: "5", actions: ["^<A", "<^A"] },
    { button: "6", actions: ["^A"] },
    { button: "7", actions: ["<<^^A", "^^<<A"] },
    { button: "8", actions: ["^^<A", "<^^A"] },
    { button: "9", actions: ["^^A"] },
  ]],
  ["4", [
    { button: "A", actions: [">>vvA"] },
    { button: "0", actions: [">vvA"] },
    { button: "1", actions: ["vA"] },
    { button: "2", actions: ["v>A", ">vA"] },
    { button: "3", actions: ["v>>A", ">>vA"] },
    { button: "4", actions: ["A"] },
    { button: "5", actions: [">A"] },
    { button: "6", actions: [">>A"] },
    { button: "7", actions: ["^A"] },
    { button: "8", actions: ["^>A", ">^A"] },
    { button: "9", actions: [">>^A", "^>>A"] },
  ]],
  ["5", [
    { button: "A", actions: [">vvA", "vv>A"] },
    { button: "0", actions: ["vvA"] },
    { button: "1", actions: ["v<A", "<vA"] },
    { button: "2", actions: ["vA"] },
    { button: "3", actions: ["v>A", ">vA"] },
    { button: "4", actions: ["<A"] },
    { button: "5", actions: ["A"] },
    { button: "6", actions: [">A"] },
    { button: "7", actions: ["^<A", "<^A"] },
    { button: "8", actions: ["^A"] },
    { button: "9", actions: [">^A", "^>A"] },
  ]],
  ["6", [
    { button: "A", actions: ["vvA"] },
    { button: "0", actions: ["vv<A", "<vvA"] },
    { button: "1", actions: ["v<<A", "<<vA"] },
    { button: "2", actions: ["v<A", "<vA"] },
    { button: "3", actions: ["vA"] },
    { button: "4", actions: ["<<A"] },
    { button: "5", actions: ["<A"] },
    { button: "6", actions: ["A"] },
    { button: "7", actions: ["^<<A", "<<^A"] },
    { button: "8", actions: ["^<A", "<^A"] },
    { button: "9", actions: ["^A"] },
  ]],
  ["7", [
    { button: "A", actions: [">>vvvA"] },
    { button: "0", actions: [">vvvA"] },
    { button: "1", actions: ["vvA"] },
    { button: "2", actions: ["vv>A", ">vvA"] },
    { button: "3", actions: ["vv>>A", ">>vvA"] },
    { button: "4", actions: ["vA"] },
    { button: "5", actions: ["v>A", ">vA"] },
    { button: "6", actions: ["v>>A", ">>vA"] },
    { button: "7", actions: ["A"] },
    { button: "8", actions: [">A"] },
    { button: "9", actions: [">>A"] },
  ]],
  ["8", [
    { button: "A", actions: [">vvvA", "vvv>A"] },
    { button: "0", actions: ["vvvA"] },
    { button: "1", actions: ["vv<A", "<vvA"] },
    { button: "2", actions: ["vvA"] },
    { button: "3", actions: ["vv>A", ">vvA"] },
    { button: "4", actions: ["v<A", "<vA"] },
    { button: "5", actions: ["vA"] },
    { button: "6", actions: ["v>A", ">vA"] },
    { button: "7", actions: ["<A"] },
    { button: "8", actions: ["A"] },
    { button: "9", actions: [">A"] },
  ]],
  ["9", [
    { button: "A", actions: ["vvvA"] },
    { button: "0", actions: ["vvv<A", "<vvvA"] },
    { button: "1", actions: ["vv<<A", "<<vvA"] },
    { button: "2", actions: ["vv<A", "<vvA"] },
    { button: "3", actions: ["vvA"] },
    { button: "4", actions: ["v<<A", "<<vA"] },
    { button: "5", actions: ["v<A", "<vA"] },
    { button: "6", actions: ["vA"] },
    { button: "7", actions: ["<<A"] },
    { button: "8", actions: ["<A"] },
    { button: "9", actions: ["A"] },
  ]],
]);

/**
 * A map of the best possible moves from any button to any other button on an arrow pad.
 * This map uses only action sequences that require only one change in direction at most
 * since that is always most efficient.
 */
const arrowMovements: MovementsMap = new Map([
  ["A", [
    { button: "A", actions: ["A"] },
    { button: "^", actions: ["<A"] },
    { button: "v", actions: ["<vA", "v<A"] },
    { button: "<", actions: ["v<<A", "<v<A"] },
    { button: ">", actions: ["vA"] },
  ]],
  ["^", [
    { button: "A", actions: [">A"] },
    { button: "^", actions: ["A"] },
    { button: "v", actions: ["vA"] },
    { button: "<", actions: ["v<A"] },
    { button: ">", actions: ["v>A", ">vA"] },
  ]],
  ["v", [
    { button: "A", actions: ["^>A", ">^A"] },
    { button: "^", actions: ["^A"] },
    { button: "v", actions: ["A"] },
    { button: "<", actions: ["<A"] },
    { button: ">", actions: [">A"] },
  ]],
  ["<", [
    { button: "A", actions: [">>^A", ">^>A"] },
    { button: "^", actions: [">^A"] },
    { button: "v", actions: [">A"] },
    { button: "<", actions: ["A"] },
    { button: ">", actions: [">>A"] },
  ]],
  [">", [
    { button: "A", actions: ["^A"] },
    { button: "^", actions: ["<^A", "^<A"] },
    { button: "v", actions: ["<A"] },
    { button: "<", actions: ["<<A"] },
    { button: ">", actions: ["A"] },
  ]],
]);

export default function (input: string): number {
  return solver(input.split("\n"), 2);
}
