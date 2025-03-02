import { ShaderMaterial, Scene, Texture, Effect } from "@babylonjs/core";

import sunTexture from "./textures/8k_sun.jpg";

import earthFragmentShader from "./shaders/fragment.glsl";
import earthVertexShader from "./shaders/vertex.glsl";

const shaderName = "sunMaterial";
Effect.ShadersStore[`${shaderName}FragmentShader`] = earthFragmentShader;
Effect.ShadersStore[`${shaderName}VertexShader`] = earthVertexShader;

export class SunMaterial extends ShaderMaterial {
  constructor(scene: Scene) {
    super(shaderName, scene, shaderName, {
      attributes: ["position", "uv"],
      uniforms: [
        "worldViewProjection",
      ],
      needAlphaBlending: true,
      needAlphaTesting: true,
    });

    this.setTexture("textureSampler", new Texture(sunTexture, scene));
  }
}
