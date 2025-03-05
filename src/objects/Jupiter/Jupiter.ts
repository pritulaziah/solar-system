import { Scene } from "@babylonjs/core";
import { JupiterMaterial } from "./JupiterMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Jupiter extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "jupiter", params);
    const material = new JupiterMaterial(scene);
    this.mesh.material = material;
  }
}
