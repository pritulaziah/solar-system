import { Scene } from "@babylonjs/core";
import { SaturnMaterial } from "./SaturnMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Saturn extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "saturn", params);
    const material = new SaturnMaterial(scene);
    this.mesh.material = material;
  }
}
