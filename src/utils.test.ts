import { formatDelta, formatTotal, getColor } from './utils';

describe('utils', () => {
  describe('formatDelta', () => {
    it('formats number with max 8 decimals', () => {
      expect(formatDelta(0.123)).toBe('0.123');
      expect(formatDelta(0.123456789)).toBe('0.12345679');
      expect(formatDelta(0.3000000001)).toBe('0.3');
      expect(formatDelta(0.12399999999)).toBe('0.124');
      expect(formatDelta(-0.12399999999)).toBe('-0.124');
      expect(formatDelta(1)).toBe('1.00');
      expect(formatDelta(1.001)).toBe('1.001');
      expect(formatDelta(-1)).toBe('-1.00');
    });

    it('returns empty string if input is 0', () => {
      expect(formatDelta(0)).toBe('');
    });
  });

  describe('formatTotal', () => {
    it('formats large number with two decimals', () => {
      expect(formatTotal(1)).toBe('1.00');
      expect(formatTotal(1.2345678)).toBe('1.23');
    });

    it('formats small number with up to 8 decimals', () => {
      expect(formatTotal(0.234567)).toBe('0.234567');
      expect(formatTotal(0.123456789)).toBe('0.12345679');
      expect(formatTotal(0.300000001)).toBe('0.3');
      expect(formatTotal(0.300000009)).toBe('0.30000001');
    });

    it('returns ellipsis for invalid value', () => {
      expect(formatTotal(0)).toBe('...');
      expect(formatTotal(-2)).toBe('...');
    });
  });

  describe('getColor', () => {
    it('gets zero color', () => {
      const delta = 0;
      const price = 42;

      expect(getColor(delta, price)).toBe('black');
    });

    it('gets positive color', () => {
      const delta = 1;
      const price = 42;

      expect(getColor(delta, price)).toBe('green');
    });

    it('gets negative color', () => {
      const delta = -1;
      const price = 42;

      expect(getColor(delta, price)).toBe('red');
    });
  });
});
