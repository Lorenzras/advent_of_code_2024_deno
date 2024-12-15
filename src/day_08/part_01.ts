type Pos = [number, number];

class Grid {
  width: number = 0;
  height: number = 0;
  antennas: Map<string, Pos[]> = new Map();
}

export const parseInput = (input: string) => {
  const grid = new Grid();
  let row = 0;
  for (let ln of input.split("\n")) {
    ln = ln.trim();
    if (!ln) {
      break;
    }
    if (grid.width === 0) {
      grid.width = ln.length;
    } else {
      console.assert(
        grid.width === ln.length,
        `rows of different lengths: ${grid.width} and ${ln.length}`
      );
    }
    grid.height++;
    for (let i = 0; i < grid.width; ++i) {
      const c = ln[i];
      if (c !== ".") {
        if (!grid.antennas.has(c)) {
          grid.antennas.set(c, []);
        }
        grid.antennas.get(c)?.push([row, i]);
      }
    }
    row++;
  }
  return grid;
};

const getAntennaPairs = (grid: Grid): [Pos, Pos][] => {
  const pairs: [Pos, Pos][] = [];
  for (const points of grid.antennas.values()) {
    for (let i = 0; i < points.length; ++i) {
      for (let j = i + 1; j < points.length; ++j) {
        pairs.push([points[i], points[j]]);
      }
    }
  }
  return pairs;
};

export const findAntinodes = (grid: Grid, resonance: boolean): Set<number> => {
  const pairs = getAntennaPairs(grid);

  const antinodes = new Set<number>();
  for (const [first, second] of pairs) {
    const d_row = second[0] - first[0];
    const d_col = second[1] - first[1];
    let nr = first[0] - d_row;
    let nc = first[1] - d_col;
    while (nr >= 0 && nc >= 0 && nr < grid.height && nc < grid.width) {
      antinodes.add(nr * grid.width + nc);
      if (!resonance) {
        break;
      }
      nr -= d_row;
      nc -= d_col;
    }
    nr = second[0] + d_row;
    nc = second[1] + d_col;
    while (nr >= 0 && nc >= 0 && nr < grid.height && nc < grid.width) {
      antinodes.add(nr * grid.width + nc);
      if (!resonance) {
        break;
      }
      nr += d_row;
      nc += d_col;
    }
    if (resonance) {
      antinodes.add(first[0] * grid.width + first[1]);
      antinodes.add(second[0] * grid.width + second[1]);
    }
  }
  return antinodes;
};

export default function (input: string): number {
  const grid = parseInput(input);
  const antinodes = findAntinodes(grid, false);

  return antinodes.size;
}
