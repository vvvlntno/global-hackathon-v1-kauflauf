export interface MapOverview {
  id: string;
  title: string;
  description: string;
  image?: string | null;
}

export interface Product {
  id: string;
  name: string;
}

export interface Tray {
  type: "tray";
  id: string;
  name: string;
  products: Product[];
}

export interface Shelf {
  type: "shelf";
  id: string;
  name: string;
  levels: {
    id: string;
    products: Product[];
  }[];
}

export type StorageUnit = Tray | Shelf;

export interface Section {
  id: string;
  name: string;
  units: StorageUnit[];
}

export interface StoreMap extends MapOverview {
  layout: {
    sections: Section[];
  };
}
