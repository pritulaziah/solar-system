import { Scene } from "@babylonjs/core";
import { MarsMaterial } from "./MarsMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Mars extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "mars", params);
    const material = new MarsMaterial(scene);
    this.mesh.material = material;
  }
}
