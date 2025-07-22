export function isOddAndMinThree(value: number): boolean {
  return !isNaN(value) && value >= 3 && value % 2 === 1;
}
