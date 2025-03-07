import { Scene } from "@babylonjs/core";
import { CelestialBody, CelestialBodyParams } from "@objects/CelestialBody";
import { Planet } from "@objects/Planet";
import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

export type MoonParams = CelestialBodyParams;

export class Moon extends CelestialBody {
  constructor(
    scene: Scene,
    name: string,
    params: CelestialBodyParams,
    hostPlanet: Planet,
    material?: UpdatebleMaterial
  ) {
    super(scene, name, params, material, hostPlanet.meshNode);
  }
}
