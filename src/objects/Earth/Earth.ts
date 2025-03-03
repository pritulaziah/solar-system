import { Scene, Color3 } from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";
import { Planet } from "../Planet";

export class Earth extends Planet {
  constructor(scene: Scene) {
    super(scene, "earth", {
      semiMajorAxis: 500,
      eccentricity: 0.0167,
      inclination: 0,
      diameter: 1,
      orbitSpeed: 0.01,
      orbitColor: new Color3(0, 1, 0),
    });
    this.mesh.material = new EarthMaterial(scene);
  }

  update(elapsedSeconds: number) {
    super.update(elapsedSeconds);
    (this.mesh.material as EarthMaterial).update(this.mesh.absolutePosition);
  }
}
