import { Scene, Texture, Effect } from "@babylonjs/core";

import texture from "./textures/2k_moon.jpg";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

import { UpdatebleMaterial } from "@materials/UpdatebleMaterial";

const shaderName = "moonMaterial";
Effect.ShadersStore[`${shaderName}FragmentShader`] = fragmentShader;
Effect.ShadersStore[`${shaderName}VertexShader`] = vertexShader;

export class MoonMaterial extends UpdatebleMaterial {
  constructor(scene: Scene) {
    super(shaderName, scene, {
      attributes: ["position", "uv"],
      uniforms: ["worldViewProjection"],
      needAlphaBlending: true,
      needAlphaTesting: true,
    });

    this.setTexture("textureSampler", new Texture(texture, scene));
  }

  update() {}
}
