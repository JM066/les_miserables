export function normalizeValue(
  value: number,
  min: number,
  max: number,
  targetMin: number = 1,
  targetMax: number = 5
): number {
  // console.log({ min, max })
  if (min === max) return (targetMin + targetMax) / 2

  return Math.ceil(targetMin + ((value - min) / (max - min)) * (targetMax - targetMin))
}
