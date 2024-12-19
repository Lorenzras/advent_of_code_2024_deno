type Location = { x: number; y: number };
type Player = Location;
type Movement = "<" | ">" | "^" | "v";
type Tile = "." | "#" | "O";
type Grid = Tile[][];

export function processInput(input: string) {
  const player: Player = { x: 0, y: 0 };
  const [gridInput, movesInput] = input.split("\n\n");
  const grid = gridInput.split("\n").map((row, i) =>
    row.split("").map((tile, j) => {
      if (tile === "@") {
        player.x = j;
        player.y = i;
        return ".";
      }
      return tile;
    })
  ) as Grid;
  const moves = movesInput.replaceAll("\n", "").split("") as Movement[];

  return { player, grid, moves };
}

function updatePosition(player: Player, grid: Grid, direction: Movement) {
  const { x, y } = calculateNextPosition(player, direction);
  const nextTile = grid[y][x];

  if (nextTile === ".") {
    player.x = x;
    player.y = y;
  } else if (nextTile === "#") {
    return;
  } else if (nextTile === "O") {
    pushCrates(player, { x, y }, grid, direction);
  }
}

function process(input: string) {
  const { player, grid, moves } = processInput(input);

  moves.forEach((direction) => updatePosition(player, grid, direction));

  return calculateScore(grid);
}

function calculateNextPosition({ x, y }: Location, direction: Movement) {
  switch (direction) {
    case "<":
      x--;
      break;
    case ">":
      x++;
      break;
    case "^":
      y--;
      break;
    case "v":
      y++;
      break;
  }
  return { x, y };
}

function pushCrates(
  player: Player,
  cratePos: Location,
  grid: Grid,
  direction: Movement
) {
  const chain = [cratePos];
  let movable = false;
  let pos = { x: cratePos.x, y: cratePos.y };

  while (true) {
    const { x, y } = calculateNextPosition(pos, direction);
    const nextTile = grid[y][x];

    if (nextTile === "#") return;
    if (nextTile === ".") {
      movable = true;
      chain.push({ x, y });
      break;
    }
    if (nextTile === "O") {
      chain.push({ x, y });
    }

    pos = { x, y };
    if (movable) break;
  }

  if (movable) {
    while (chain.length) {
      const { x, y } = chain.pop()!;
      grid[y][x] = chain.length ? "O" : ".";
    }
    player.x = cratePos.x;
    player.y = cratePos.y;
  }
}

function calculateScore(grid: Grid) {
  let total = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === "O") {
        total += 100 * y + x;
      }
    }
  }
  return total;
}

export default function (input: string): number {
  return process(input);
}
