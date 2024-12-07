// regex is slow, so I'll improve this later

const cleanseInput = (input: string): string[] => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  return input.match(regex) || [];
};

const removeDisabled = (input: string): string => {
  const regex = /don't\(\)[\s\S]*?(do\(\)|$)/g;
  return input.replace(regex, "");
};

const parseMul = (mul: string): [number, number] => {
  const regex = /\d{1,3}/g;
  const [a, b] = mul.match(regex) || [];
  return [Number(a), Number(b)];
};

export default function (input: string): number {
  const enabledOnly = removeDisabled(input);
  const cleanInput = cleanseInput(enabledOnly);

  let sum = 0;
  for (const item of cleanInput) {
    const [a, b] = parseMul(item);
    sum += a * b;
  }

  return sum;
}
