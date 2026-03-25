export type Category = 'auto' | 'real_estate' | 'electronics';

export type AutoParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

export type RealEstateParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

export type ElectronicsParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type Item = {
  id: number;
  title: string;
  description?: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  needsRevision?: boolean;
} & (
  | { category: 'auto'; params: AutoParams }
  | { category: 'real_estate'; params: RealEstateParams }
  | { category: 'electronics'; params: ElectronicsParams }
);

export type ItemListItem = {
  category: Category;
  title: string;
  price: number | null;
  needsRevision: boolean;
};

export type ItemsListResponse = {
  items: ItemListItem[];
  total: number;
};

export type ItemSortColumn = 'title' | 'createdAt' | 'price';

export type SortDirection = 'asc' | 'desc';

export type ItemsQueryParams = {
  q?: string;
  limit?: number;
  skip?: number;
  categories?: Category[];
  needsRevision?: boolean;
  sortColumn?: ItemSortColumn;
  sortDirection?: SortDirection;
};

export type ItemUpdatePayload = {
  title: string;
  description?: string;
  price: number;
  params: AutoParams | RealEstateParams | ElectronicsParams;
};
