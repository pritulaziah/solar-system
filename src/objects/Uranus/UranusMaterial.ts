import { ShaderMaterial, Scene, Texture, Effect } from "@babylonjs/core";

import texture from "./textures/2k_uranus.jpg";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

const shaderName = "uranusMaterial";
Effect.ShadersStore[`${shaderName}FragmentShader`] = fragmentShader;
Effect.ShadersStore[`${shaderName}VertexShader`] = vertexShader;

export class UranusMaterial extends ShaderMaterial {
  constructor(scene: Scene) {
    super(shaderName, scene, shaderName, {
      attributes: ["position", "uv"],
      uniforms: ["worldViewProjection"],
      needAlphaBlending: true,
      needAlphaTesting: true,
    });

    this.setTexture("textureSampler", new Texture(texture, scene));
  }

  update() {}
}
