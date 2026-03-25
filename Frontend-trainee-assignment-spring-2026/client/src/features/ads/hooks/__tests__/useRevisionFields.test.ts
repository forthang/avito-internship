import { getRevisionFields } from '../useRevisionFields';
import type { Item } from '../../api/items.types';

const makeAutoItem = (overrides: Partial<Item> = {}): Item => ({
  id: 1,
  title: 'Test',
  price: 1000,
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
  category: 'auto',
  params: {},
  ...overrides,
} as Item);

describe('getRevisionFields', () => {
  it('returns all missing fields for empty auto item', () => {
    const item = makeAutoItem({ description: undefined });
    const fields = getRevisionFields(item);
    expect(fields).toContain('Описание');
    expect(fields).toContain('Марка');
    expect(fields).toContain('Модель');
    expect(fields.length).toBeGreaterThan(5);
  });

  it('returns empty array for fully filled auto item', () => {
    const item = makeAutoItem({
      description: 'Full description',
      category: 'auto',
      params: {
        brand: 'Toyota',
        model: 'Camry',
        yearOfManufacture: 2020,
        transmission: 'automatic',
        mileage: 50000,
        enginePower: 200,
      },
    } as Partial<Item>);
    const fields = getRevisionFields(item);
    expect(fields).toEqual([]);
  });

  it('returns undefined fields for electronics', () => {
    const item: Item = {
      id: 2,
      title: 'Phone',
      description: 'desc',
      price: 500,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
      category: 'electronics',
      params: { type: 'phone', brand: 'Apple' },
    };
    const fields = getRevisionFields(item);
    expect(fields).toContain('Модель');
    expect(fields).toContain('Состояние');
    expect(fields).toContain('Цвет');
    expect(fields).not.toContain('Описание');
  });
});
