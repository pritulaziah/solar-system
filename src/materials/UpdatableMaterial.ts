import {
  ShaderMaterial,
  Scene,
  IShaderMaterialOptions,
  Mesh,
} from "@babylonjs/core";

export abstract class UpdatableMaterial extends ShaderMaterial {
  constructor(
    name: string,
    scene: Scene,
    options: Partial<IShaderMaterialOptions>
  ) {
    super(name, scene, name, options);
  }

  update(_mesh: Mesh) {}
}
