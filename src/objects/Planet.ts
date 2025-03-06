import { Scene } from "@babylonjs/core";
import { CelestialBody, CelestialBodyParams } from "./CelestialBody";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

export type PlanetParams = CelestialBodyParams;

export class Planet extends CelestialBody {
  constructor(
    protected scene: Scene,
    protected name: string,
    protected params: PlanetParams,
    protected material?: UpdatebleMaterial
  ) {
    super(scene, name, params, material);
  }

  update(elapsedSeconds: number): void {
    super.update(elapsedSeconds);
  }
}
