import { Scene } from "@babylonjs/core";
import { NeptuneMaterial } from "./NeptuneMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Neptune extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "neptune", params);
    const material = new NeptuneMaterial(scene);
    this.mesh.material = material;
  }
}
