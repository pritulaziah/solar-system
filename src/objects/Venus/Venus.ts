import { Scene } from "@babylonjs/core";
import { VenusMaterial } from "./VenusMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Venus extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "venus", params);
    const material = new VenusMaterial(scene);
    this.mesh.material = material;
  }
}
