import { Scene } from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";
import { CelestialBody, CelestialBodyParams } from "../CelestialBody";

export class Earth extends CelestialBody {
  constructor(scene: Scene, params: CelestialBodyParams) {
    super(scene, "earth", params);
    this.mesh.material = new EarthMaterial(scene);
  }

  update(elapsedSeconds: number) {
    super.update(elapsedSeconds);
    (this.mesh.material as EarthMaterial).update(this.mesh.absolutePosition);
  }
}
