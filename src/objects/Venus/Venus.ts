import { Scene } from "@babylonjs/core";
import { VenusMaterial } from "./VenusMaterial";
import { Planet, PlanetParams } from "../Planet";

export class Venus extends Planet {
  constructor(scene: Scene, params: PlanetParams) {
    super(scene, "venus", params);
    const material = new VenusMaterial(scene);
    this.mesh.material = material;
  }
}
