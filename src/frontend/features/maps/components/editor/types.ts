export interface DroppedItem {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;

  name?: string;
  colorIndex?: number;
}
