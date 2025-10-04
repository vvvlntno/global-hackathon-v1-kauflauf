export interface DroppedItem {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colorIndex: number;
  parentId?: string;
}

export interface Article {
  id: string;
  name: string;
  section: string | null;
  image_url?: string;
}