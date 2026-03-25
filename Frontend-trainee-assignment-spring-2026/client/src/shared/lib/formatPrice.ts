export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return 'Цена не указана';
  return `${price} ₽`;
}
