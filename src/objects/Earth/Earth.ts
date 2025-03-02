import { Scene, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";

export class Earth {
  mesh: Mesh;

  constructor(scene: Scene, position: Vector3) {
    const earth = CreateSphere("earth", { diameter: 1, segments: 64 }, scene);
    earth.material = new EarthMaterial(scene);
    earth.rotation.y = Math.PI / 4;
    earth.position = position;
    this.mesh = earth;
  }

  update() {}
}
