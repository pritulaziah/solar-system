import { Scene, CreateSphere, Mesh, Vector3 } from "@babylonjs/core";
import { SunMaterial } from "./SunMaterial";

export type SunParams = {
  diameter: number;
}

export class Sun {
  mesh: Mesh;

  constructor(scene: Scene, params: SunParams) {
    const mesh = CreateSphere("sun", { diameter: params.diameter, segments: 64 }, scene);
    mesh.material = new SunMaterial(scene);
    mesh.position = Vector3.Zero();
    this.mesh = mesh;
  }

  update(_: number) {}
}
