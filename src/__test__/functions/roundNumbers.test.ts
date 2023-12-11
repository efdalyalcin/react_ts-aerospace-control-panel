import { roundNumbers } from '@/helpers/roundNumbers';
import { describe, expect, it } from 'vitest';

describe('roundNumbers', () => {
  it('should return a number rounded to 2 decimal places when given a valid number', () => {
    const result = roundNumbers(3.14159);
    expect(result).toBe(3.14);
  });

  it('should return 0 when given 0', () => {
    const result = roundNumbers(0);
    expect(result).toBe(0);
  });

  it('should return 0 when given -0', () => {
    const result = roundNumbers(-0);
    expect(result).toBe(0);
  });

  it('should return NaN when given NaN', () => {
    const result = roundNumbers(NaN);
    expect(result).toBeNaN();
  });
});
