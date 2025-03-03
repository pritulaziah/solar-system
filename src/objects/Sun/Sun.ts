import { Scene, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { SunMaterial } from "./SunMaterial";

export class Sun {
  static readonly DIAMETER = 109;

  mesh: Mesh;

  constructor(scene: Scene) {
    const mesh = CreateSphere("sun", { diameter: Sun.DIAMETER, segments: 64 }, scene);
    mesh.material = new SunMaterial(scene);
    mesh.position = Vector3.Zero();
    this.mesh = mesh;
  }

  update() {}
}
