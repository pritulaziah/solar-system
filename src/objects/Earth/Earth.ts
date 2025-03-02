import { Scene, CreateSphere, Mesh } from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";

export class Earth {
  earth: Mesh;

  constructor(scene: Scene) {
    this.earth = CreateSphere("earth", { diameter: 2, segments: 64 }, scene);
    this.earth.material = new EarthMaterial(scene);
  }

  update() {}
}
