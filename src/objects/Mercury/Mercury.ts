import { Scene } from "@babylonjs/core";
import { MercuryMaterial } from "./MercuryMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Mercury extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "mercury", params);
    const material = new MercuryMaterial(scene);
    this.mesh.material = material;
  }
}
