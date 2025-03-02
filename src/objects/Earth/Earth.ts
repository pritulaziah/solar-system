import { Scene, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { EarthMaterial } from "./EarthMaterial";

export class Earth {
  mesh: Mesh;
  material: EarthMaterial;

  constructor(scene: Scene, position: Vector3) {
    const earth = CreateSphere("earth", { diameter: 1, segments: 64 }, scene);
    const earthMaterial = new EarthMaterial(scene);
    earth.rotation.y = Math.PI / 4;
    earth.position = position;
    earth.material = earthMaterial;
    this.material = earthMaterial;
    this.mesh = earth;
  }

  update() {
    this.material.update(this.mesh.position);
  }
}
