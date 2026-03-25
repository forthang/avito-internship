import { Category } from '@/features/ads/api/items.types';

export const CATEGORY_LABELS: Record<Category, string> = {
  auto: 'Авто',
  real_estate: 'Недвижимость',
  electronics: 'Электроника',
};

export const AUTO_PARAM_LABELS: Record<string, string> = {
  brand: 'Марка',
  model: 'Модель',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Коробка передач',
  mileage: 'Пробег',
  enginePower: 'Мощность двигателя',
};

export const REAL_ESTATE_PARAM_LABELS: Record<string, string> = {
  type: 'Тип',
  address: 'Адрес',
  area: 'Площадь',
  floor: 'Этаж',
};

export const ELECTRONICS_PARAM_LABELS: Record<string, string> = {
  type: 'Тип',
  brand: 'Бренд',
  model: 'Модель',
  condition: 'Состояние',
  color: 'Цвет',
};

export const TRANSMISSION_LABELS: Record<string, string> = {
  automatic: 'Автомат',
  manual: 'Механика',
};

export const REAL_ESTATE_TYPE_LABELS: Record<string, string> = {
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната',
};

export const ELECTRONICS_TYPE_LABELS: Record<string, string> = {
  phone: 'Телефон',
  laptop: 'Ноутбук',
  misc: 'Прочее',
};

export const CONDITION_LABELS: Record<string, string> = {
  new: 'Новое',
  used: 'Б/У',
};

export const ITEMS_PER_PAGE = 10;
