import { MapOverview, StoreMap } from "../../../app/maps/types/maps";
import data from "@/mocks/maps.json";

const maps: StoreMap[] = data as StoreMap[];

export function getMapOverviews(): MapOverview[] {
  return maps.map(({ id, title, description, image }) => ({
    id,
    title,
    description,
    image,
  }));
}

export function getMapById(id: string): StoreMap | undefined {
  return maps.find((m) => m.id === id);
}

export function createMap(newMap: StoreMap) {
  maps.push(newMap);
  return newMap;
}
