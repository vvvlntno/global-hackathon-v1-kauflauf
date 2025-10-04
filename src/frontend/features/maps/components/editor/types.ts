export interface DroppedItem {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colorIndex: number;
  parentId?: string; // neu: für Hierarchie
}

