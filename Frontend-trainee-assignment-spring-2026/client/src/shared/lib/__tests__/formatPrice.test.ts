import { formatPrice } from '../formatPrice';

describe('formatPrice', () => {
  it('returns "Цена не указана" for null', () => {
    expect(formatPrice(null)).toBe('Цена не указана');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0 ₽');
  });

  it('formats small price', () => {
    expect(formatPrice(1000)).toBe('1000 ₽');
  });

  it('formats large price', () => {
    expect(formatPrice(1200000)).toBe('1200000 ₽');
  });
});
