import { Scene } from "@babylonjs/core";
import { MarsMaterial } from "./MarsMaterial";
import { Planet, PlanetParams } from "../Planet";

export class Mars extends Planet {
  constructor(scene: Scene, params: PlanetParams) {
    super(scene, "marc", params);
    const material = new MarsMaterial(scene);
    this.mesh.material = material;
  }
}
