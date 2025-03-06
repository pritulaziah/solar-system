import { ShaderMaterial, Scene, IShaderMaterialOptions, Mesh } from "@babylonjs/core";

export abstract class UpdatebleMaterial extends ShaderMaterial {
  constructor(
    name: string,
    protected scene: Scene,
    options: Partial<IShaderMaterialOptions>,
  ) {
    super(name, scene, name, options);
  }

  update(_mesh: Mesh) {}
}
