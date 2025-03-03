import { Scene, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { SunMaterial } from "./SunMaterial";

export class Sun {
  mesh: Mesh;

  constructor(scene: Scene) {
    const mesh = CreateSphere("sun", { diameter: 109, segments: 64 }, scene);
    mesh.material = new SunMaterial(scene);
    mesh.position = Vector3.Zero();
    this.mesh = mesh;
  }

  update() {}
}
