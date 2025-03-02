import { UniformBuffer, Vector3, AbstractEngine } from "@babylonjs/core";

export class GlobalUniforms {
  private static _instance: GlobalUniforms | null = null;

  private _ubo: UniformBuffer;

  private constructor(engine: AbstractEngine) {
    this._ubo = new UniformBuffer(engine, undefined, true, "myGlobal");
    this._ubo.addUniform("time", 4);
    this._ubo.addUniform("sunPosition", 4);
    this._ubo.create();
  }

  public get ubo(): UniformBuffer {
    return this._ubo;
  }

  public static getInstance(engine: AbstractEngine): GlobalUniforms {
    if (!GlobalUniforms._instance) {
      GlobalUniforms._instance = new GlobalUniforms(engine);
    }

    return GlobalUniforms._instance;
  }

  public update(time: number, sunPosition: Vector3): void {
    this._ubo.updateFloat4("time", time, 0, 0, 0);
    this._ubo.updateFloat4("sunPosition", sunPosition.x, sunPosition.y, sunPosition.z, 1.0);
    this._ubo.update();
  }
}
