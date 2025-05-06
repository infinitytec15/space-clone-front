declare module "@mapbox/mapbox-gl-draw" {
  import { Map } from "mapbox-gl";

  export interface DrawOptions {
    displayControlsDefault?: boolean;
    controls?: {
      point?: boolean;
      line_string?: boolean;
      polygon?: boolean;
      trash?: boolean;
      combine_features?: boolean;
      uncombine_features?: boolean;
    };
    styles?: any[];
    modes?: any;
    defaultMode?: string;
    userProperties?: boolean;
  }

  export interface DrawFeature {
    id: string;
    type: string;
    properties: any;
    geometry: {
      type: string;
      coordinates: any[];
    };
  }

  export interface DrawCreateEvent {
    type: string;
    features: DrawFeature[];
  }

  export interface DrawSelectionChangeEvent {
    type: string;
    features: DrawFeature[];
    points: DrawFeature[];
  }

  export interface DrawModeChangeEvent {
    type: string;
    mode: string;
  }

  export interface DrawUpdateEvent {
    type: string;
    features: DrawFeature[];
    action: string;
  }

  export interface DrawDeleteEvent {
    type: string;
    features: DrawFeature[];
  }

  export interface DrawCombineEvent {
    type: string;
    features: DrawFeature[];
    deletedFeatures: DrawFeature[];
  }

  export interface DrawUncombineEvent {
    type: string;
    features: DrawFeature[];
    deletedFeatures: DrawFeature[];
  }

  export default class MapboxDraw {
    constructor(options?: DrawOptions);
    add(geojson: any): string[];
    get(featureId: string): DrawFeature | undefined;
    getAll(): { type: string; features: DrawFeature[] };
    delete(featureIds: string | string[]): this;
    deleteAll(): this;
    set(featureCollection: { type: string; features: DrawFeature[] }): string[];
    trash(): this;
    combineFeatures(): this;
    uncombineFeatures(): this;
    getSelectedIds(): string[];
    getSelectedPoints(): { type: string; features: DrawFeature[] };
    getSelected(): { type: string; features: DrawFeature[] };
    getFeatureIdsAt(point: { x: number; y: number }): string[];
    setFeatureProperty(featureId: string, property: string, value: any): this;
    changeMode(mode: string, options?: any): this;
    getMode(): string;
    modes: any;
  }
}
