export function normalizeValue(
  value: number = 0,
  min: number,
  max: number,
  targetMin: number = 1,
  targetMax: number = 6
): number {
  if (min === max) return (targetMin + targetMax) / 2
  return Math.ceil(targetMin + ((value - min) / (max - min)) * (targetMax - targetMin))
}
