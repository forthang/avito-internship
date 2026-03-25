import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('formats ISO date to Russian locale', () => {
    const result = formatDate('2025-01-15T10:30:00Z');
    expect(result).toContain('2025');
    expect(result).toContain('15');
  });

  it('handles different dates', () => {
    const result = formatDate('2024-12-25T00:00:00Z');
    expect(result).toContain('2024');
    expect(result).toContain('25');
  });
});
