import { ShaderMaterial, Scene, Texture, Effect, Vector3 } from "@babylonjs/core";

import dayTexture from "./textures/8k_earth_daymap.jpg";
import nightTexture from "./textures/8k_earth_nightmap.jpg";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

import { GlobalUniforms } from "@core/GlobalUniforms";

const shaderName = "earthMaterial";
Effect.ShadersStore[`${shaderName}FragmentShader`] = fragmentShader;
Effect.ShadersStore[`${shaderName}VertexShader`] = vertexShader;

export class EarthMaterial extends ShaderMaterial {
  constructor(scene: Scene) {
    super(shaderName, scene, shaderName, {
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "world",
        "worldView",
        "view",
        "projection",
        "worldViewProjection",
      ],
      uniformBuffers: ["myGlobal"],
      needAlphaBlending: true,
      needAlphaTesting: true,
    });

    this.setUniformBuffer("myGlobal", GlobalUniforms.getInstance(scene.getEngine()).ubo);
    this.setTexture("dayTexture", new Texture(dayTexture, scene));
    this.setTexture("nightTexture", new Texture(nightTexture, scene));
  }

  update(earthPosition: Vector3) {
    this.setVector3('earthPosition', earthPosition);
  }
}
