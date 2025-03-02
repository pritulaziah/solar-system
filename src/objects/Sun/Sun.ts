import { Scene, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { SunMaterial } from "./SunMaterial";

export class Sun {
  mesh: Mesh;

  constructor(scene: Scene) {
    const sun = CreateSphere("sun", { diameter: 109, segments: 64 }, scene);
    sun.material = new SunMaterial(scene);
    sun.position = Vector3.Zero();
    this.mesh = sun;
  }

  update() {}
}
