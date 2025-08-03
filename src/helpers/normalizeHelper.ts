/**
 * Normalizes a value from one range to another range
 * 
 * @param targetMin - The minimum value of the target range (default: 1)
 * @param targetMax - The maximum value of the target range (default: 6)
 * @returns The normalized value within the target range
 * 
 */

export function normalizeValue(
  value: number = 0,
  min: number,
  max: number,
  targetMin: number = 1,
  targetMax: number = 6,
  round: boolean = true
): number {
 
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(targetMin) || !Number.isFinite(targetMax)) {
    throw new Error('All parameters must be finite numbers')
  }

  if (targetMin > targetMax) {
    throw new Error('targetMin must be less than or equal to targetMax')
  }

  if (min === max) {
    const midpoint = (targetMin + targetMax) / 2
    return round ? Math.round(midpoint) : midpoint
  }

  // Ensure min is actually smaller than max
  if (min > max) {
    [min, max] = [max, min] 
  }

  // Clamp input value to source range to prevent extrapolation
  const clampedValue = Math.max(min, Math.min(max, value))

  // Calculate normalized ratio (0 to 1)
  const normalizedRatio = (clampedValue - min) / (max - min)

  const mappedValue = targetMin + (normalizedRatio * (targetMax - targetMin))

  return round ? Math.round(mappedValue) : mappedValue
}
