import { Scene } from "@babylonjs/core";
import { MercuryMaterial } from "./MercuryMaterial";
import { Planet, PlanetParams } from "../Planet";

export class Mercury extends Planet {
  constructor(scene: Scene, params: PlanetParams) {
    super(scene, "mercury", params);
    const material = new MercuryMaterial(scene);
    this.mesh.material = material;
  }
}
