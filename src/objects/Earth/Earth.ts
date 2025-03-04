import { Scene } from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";
import { Planet, PlanetParams } from "../Planet";

export class Earth extends Planet {
  constructor(scene: Scene, params: PlanetParams) {
    super(scene, "earth", params);
    this.mesh.material = new EarthMaterial(scene);
  }

  update(elapsedSeconds: number) {
    super.update(elapsedSeconds);
    (this.mesh.material as EarthMaterial).update(this.mesh.absolutePosition);
  }
}
