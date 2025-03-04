import { Scene, Color3 } from "@babylonjs/core";
import { MercuryMaterial } from "./MercuryMaterial";
import { Planet } from "../Planet";

export class Mercury extends Planet {
  constructor(scene: Scene) {
    super(scene, "mercury", {
      semiMajorAxis: 193.5,
      eccentricity: 0.2056,
      orbitSpeed: 0.01 / 0.24,
      diameter: 0.383,
      inclination: 7,
      orbitColor: new Color3(0.7, 0.7, 0.7),
    });
    const material = new MercuryMaterial(scene);
    this.mesh.material = material;
  }
}
