import { Scene, Color3 } from "@babylonjs/core";
import { VenusMaterial } from "./VenusMaterial";
import { Planet } from "../Planet";

export class Venus extends Planet {
  constructor(scene: Scene) {
    super(scene, "venus", {
      semiMajorAxis: 362,
      eccentricity: 0.0067,
      inclination: 3.39,
      diameter: 0.949,
      orbitSpeed: 0.0167,
      orbitColor: new Color3(1, 0.5, 0),
    });
    const material = new VenusMaterial(scene);
    this.mesh.material = material;
  }
}
