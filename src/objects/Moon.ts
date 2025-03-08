import { Scene } from "@babylonjs/core";
import { CelestialBody, CelestialBodyParams } from "@objects/CelestialBody";
import { Planet } from "@objects/Planet";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

export type MoonParams = CelestialBodyParams;

export class Moon extends CelestialBody {
  constructor(
    protected scene: Scene,
    protected name: string,
    protected params: CelestialBodyParams,
    protected hostPlanet: Planet,
    protected material?: UpdatebleMaterial
  ) {
    super(scene, name, params, material, hostPlanet.meshNode);
  }
}
